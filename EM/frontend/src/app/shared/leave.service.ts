import { Injectable } from "@angular/core";
import { Leave } from "./model/leaves.model";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ADMIN_STATUS, EmployeeService } from "./employee.service";

@Injectable( {
               providedIn: "root"
             } )
export class LeaveService {

  leavesChanged = new Subject<Leave[]>();
  leaveSubject = new Subject<Leave[]>();
  leaveServerUrl = "https://employee-managment-f5252.firebaseio.com/leaves.json";
  private leaves: Leave[] = [];
  userId: number;

  constructor( private http: HttpClient, private employeeService: EmployeeService ) { }

  getLeaves() {
    return this.leaves;
  }

  setLeaves( leaves: Leave[] ) {
    this.leaves = leaves;
    this.leaveSubject.next( this.getCurrentLeaves() );
    this.leavesChanged.next( this.leaves );
  }

  addLeave( userId: number, startDate: Date, endDate: Date, reason: string ) {
    const leaveId = this.leaves ? this.leaves.length : 0;
    this.leaves.push( new Leave( userId, leaveId, startDate, endDate, reason, ADMIN_STATUS.pending ) );
    this.leavesChanged.next( this.getLeaves() );
    this.storeLeaves();
    this.leaveSubject.next( this.getCurrentLeaves() );
  }

  fetchLeaves() {
    this.http.get<Leave[]>( this.leaveServerUrl ).pipe( tap( leaves => {
      if ( leaves ) {
        this.setLeaves( leaves );
      }
    } ) ).subscribe();
    this.userId = this.employeeService.employeeSubject.getValue().userId;
  }

  storeLeaves() {
    this.http.put<Leave[]>( this.leaveServerUrl, this.getLeaves() ).subscribe();
    this.leavesChanged.next( this.getLeaves() );
  }

  getCurrentLeaves() {
    let temp: Leave[] = [];
    if ( this.leaves ) {
      for ( let l of this.leaves ) {
        if ( l.userId === this.userId ) {
          temp.push( l );
        }
      }
    }
    return temp;
  }

  changeLeaveStatus( leave: Leave, status: string ) {
    for ( let l of this.leaves ) {
      if ( l === leave ) {}
      l.status = status;
    }
    this.storeLeaves();
  }

}
