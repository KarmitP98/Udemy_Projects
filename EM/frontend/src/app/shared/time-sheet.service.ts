import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TimeSheet } from "./model/time-sheet";
import { map } from "rxjs/operators";
import { EXT } from "./leave.service";

@Injectable( {
               providedIn: "root"
             } )
export class TimeSheetService {

  timeSheetUrl = "https://employee-managment-f5252.firebaseio.com/time-sheets";

  constructor( private http: HttpClient ) { }

  // Fetch TimeSheets
  // @current and @userId is used to check if you need timesheets for current employee
  fetchTimeSheets( current: boolean, userId?: number ) {
    return this.http.get( this.timeSheetUrl + EXT ).pipe( map( ( value ) => {
      if ( value ) {
        const temp: TimeSheet[] = [];
        for ( const key in value ) {
          temp.push( value[key] );
        }
        if ( current ) {
          return temp.filter( ( value1: TimeSheet ) => {
            return value1.userId === userId;
          } );
        } else {
          return temp;
        }
      }
    } ) );
  }

  // Add new TimeSheet and add update the name to key
  addTimeSheet( sheet: TimeSheet ) {
    this.http.post<TimeSheet>( this.timeSheetUrl + EXT, sheet ).subscribe( value => {
      value.name = value.name;
      this.updateTimeSheet( value, value.name );
    } );
  }

  updateTimeSheet( sheet: TimeSheet, sheetName: string ) {
    this.http.patch<TimeSheet>( this.timeSheetUrl + "/" + sheetName + EXT, sheet ).subscribe();
  }

}
