import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TimeSheet } from "./model/time-sheet";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable( {
               providedIn: "root"
             } )
export class TimeSheetService {

  timeSheetUrl = "https://employee-managment-f5252.firebaseio.com/time-sheets";

  constructor( private http: HttpClient, private firestore: AngularFireDatabase ) { }

  // Fetch TimeSheets
  // @current and @userId is used to check if you need timesheets for current employee
  fetchTimeSheets( current: boolean, sheetId?: string ) {
    // return this.http.get( this.timeSheetUrl + EXT ).pipe( map( ( value ) => {
    //   if ( value ) {
    //     const temp: TimeSheet[] = [];
    //     for ( const key in value ) {
    //       temp.push( value[key] );
    //     }
    //     if ( current ) {
    //       return temp.filter( ( value1: TimeSheet ) => {
    //         return value1.userId === userId;
    //       } );
    //     } else {
    //       return temp;
    //     }
    //   }
    // } ) );

    if ( current ) {
      return this.firestore.list<TimeSheet>( "time-sheets", ref => ref.child( "empId" ).equalTo( sheetId ) ).valueChanges();
    }
    return this.firestore.list<TimeSheet>( "time-sheets" ).valueChanges();


  }

  // Add new TimeSheet and add update the name to key
  addTimeSheet( sheet: TimeSheet ) {
    // this.http.post<TimeSheet>( this.timeSheetUrl + EXT, sheet ).subscribe( value => {
    //   value.name = value.name;  // Store unique key as "name" field to be retrieved for updating and deleting later
    //   this.updateTimeSheet( value, value.name );
    // } );

    this.firestore.list<TimeSheet>( "time-sheets" ).push( sheet ).then( value => {
      sheet.sheetId = value.key;
      this.updateTimeSheet( sheet, value.key );
    } );
  }

  updateTimeSheet( sheet: TimeSheet, sheetId: string ) {
    // this.http.patch<TimeSheet>( this.timeSheetUrl + "/" + sheetName + EXT, sheet ).subscribe();
    this.firestore.list<TimeSheet>( "time-sheets" ).update( sheetId, sheet );
  }

  removeTimeSheet( sheetName: string ) {
    // this.http.delete( this.timeSheetUrl + "/" + sheetName + EXT ).subscribe();
    this.firestore.list<TimeSheet>( "time-sheets" ).remove( sheetName );
  }

}
