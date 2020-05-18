import { Injectable } from "@angular/core";
import { Leave } from "./model/leaves.model";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

export const EXT = ".json";

@Injectable( {
               providedIn: "root"
             } )
export class LeaveService {

  leaveServerUrl = "https://employee-managment-f5252.firebaseio.com/leaves";

  constructor( private http: HttpClient ) { }

  fetchLeaves( current: boolean, id?: number ) {
    return this.http.get<Leave[]>( this.leaveServerUrl + EXT ).pipe( map( ( leaves: Leave[] ) => {
      if ( leaves ) {
        if ( current ) {
          return leaves.filter( ( value ) => {
            return value.userId === id;
          } );
        } else {
          return leaves;
        }
      }
    } ) );
  }

  addLeave( leaves: Leave[] ) {
    this.http.put<Leave[]>( this.leaveServerUrl + EXT, leaves ).subscribe();
  }

  updateLeave( leave: Leave, leaveId: number ) {
    this.http.patch<Leave>( this.leaveServerUrl + "/" + leaveId + EXT, leave ).subscribe();
  }

}
