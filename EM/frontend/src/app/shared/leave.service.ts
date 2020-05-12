import { Injectable } from "@angular/core";
import { Leave } from "./model/leaves.model";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ADMIN_STATUS } from "./employee.service";

@Injectable( {
               providedIn: "root"
             } )
export class LeaveService {

  leavesChanged = new Subject<Leave[]>();
  leaveServerUrl = "https://employee-managment-f5252.firebaseio.com/leaves.json";
  private leaves: Leave[] = [];

  constructor( private http: HttpClient ) { }

  getLeaves() {
    return this.leaves;
  }

  setLeaves( leaves: Leave[] ) {
    this.leaves = leaves;
    this.leavesChanged.next( this.leaves );
  }

  addLeave( userId: number, startDate: Date, endDate: Date, reason: string ) {
    const leaveId = this.leaves ? this.leaves.length : 0;
    const leave = new Leave( userId, leaveId, startDate, endDate, reason, ADMIN_STATUS.pending );
  }

  fetchLeaves() {
    this.http.get<Leave[]>( this.leaveServerUrl ).pipe( tap( leaves => {this.setLeaves( leaves );} ) ).subscribe();
  }

  storeLeaves() {
    const leaves = this.getLeaves();
    this.http.put<Leave[]>( this.leaveServerUrl, leaves ).subscribe();
  }

}
