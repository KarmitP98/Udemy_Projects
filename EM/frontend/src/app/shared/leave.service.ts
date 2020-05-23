import { Injectable } from "@angular/core";
import { Leave } from "./model/leaves.model";
import { HttpClient } from "@angular/common/http";
import { AngularFireDatabase } from "@angular/fire/database";

export const EXT = ".json";

@Injectable( {
               providedIn: "root"
             } )
export class LeaveService {

  leaveServerUrl = "https://employee-managment-f5252.firebaseio.com/leaves";

  constructor( private http: HttpClient, private firestore: AngularFireDatabase ) { }

  fetchLeaves( current: boolean, leaveId?: string ) {
    // return this.http.get( this.leaveServerUrl + EXT ).pipe( map( ( leaves ) => {
    //   if ( leaves ) {
    //     const temp: Leave[] = [];
    //     for ( const key in leaves ) {
    //       // @ts-ignore
    //       temp.push( leaves[key] );
    //     }
    //     if ( current ) {
    //       return temp.filter( ( value1 ) => {
    //         return value1.userId === id;
    //       } );
    //     } else {
    //       return temp;
    //     }
    //   }
    // } ) );
    if ( current ) {
      return this.firestore.list<Leave>( "leaves", ref => ref.child( "empId" ).equalTo( leaveId ) ).valueChanges();
    }
    return this.firestore.list<Leave>( "leaves" ).valueChanges();
  }

  addLeave( leave: Leave ) {
    // this.http.post<Leave>( this.leaveServerUrl + EXT, leave ).subscribe( value => {
    //   value.name = value.name;  // Store unique key as "name" field to be retrieved for updating and deleting later
    //   this.updateLeave( value, value.name );
    // } );
    this.firestore.list<Leave>( "leaves" ).push( leave ).then( value => {
      leave.leaveId = value.key;
      this.updateLeave( leave, value.key );
    } );
  }

  updateLeave( leave: Leave, leaveId: string ) {
    // this.http.patch<Leave>( this.leaveServerUrl + "/" + leaveName + EXT, leave ).subscribe();
    this.firestore.list<Leave>( "leaves" ).update( leaveId, leave );
  }

  removeLeave( leaveId: string ) {
    // this.http.delete( this.leaveServerUrl + "/" + leaveName + EXT ).subscribe();
    this.firestore.list<Leave>( "leaves" ).remove( leaveId );
  }

}
