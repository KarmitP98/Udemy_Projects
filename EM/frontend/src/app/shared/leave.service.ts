import { Injectable } from "@angular/core";
import { Leave } from "./model/leaves.model";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

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

  }

  fetchLeaves() {
    return this.http.get<Leave[]>( this.leaveServerUrl ).pipe( tap( leaves => {this.setLeaves( leaves );} ) ).subscribe();
  }

  storeLeaves() {
    const leaves = this.getLeaves();
    return this.http.put<Leave[]>( this.leaveServerUrl, leaves ).subscribe();
  }

}
