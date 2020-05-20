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
    return this.http.get( this.leaveServerUrl + EXT ).pipe( map( ( leaves ) => {
      if ( leaves ) {
        const temp: Leave[] = [];
        for ( const key in leaves ) {
          // @ts-ignore
          temp.push( leaves[key] );
        }
        if ( current ) {
          return temp.filter( ( value1 ) => {
            return value1.userId === id;
          } );
        } else {
          return temp;
        }
      }
    } ) );
  }

  addLeave( leave: Leave ) {
    this.http.post<Leave>( this.leaveServerUrl + EXT, leave ).subscribe( value => {
      value.name = value.name;  // Store unique key as "name" field to be retrieved for updating and deleting later
      this.updateLeave( value, value.name );
    } );
  }

  updateLeave( leave: Leave, leaveName: string ) {
    this.http.patch<Leave>( this.leaveServerUrl + "/" + leaveName + EXT, leave ).subscribe();
  }

  removeLeave( leaveName: string ) {
    this.http.delete( this.leaveServerUrl + "/" + leaveName + EXT ).subscribe();
  }

}
