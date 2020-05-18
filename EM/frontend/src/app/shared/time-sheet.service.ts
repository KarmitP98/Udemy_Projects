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

  fetchTimeSheets( current: boolean, userId?: number ) {
    return this.http.get<TimeSheet[]>( this.timeSheetUrl + EXT ).pipe( map( ( value: TimeSheet[] ) => {
      if ( value ) {
        if ( current ) {
          return value.filter( ( value1: TimeSheet ) => {
            return value1.userId === userId;
          } );
        } else {
          return value;
        }
      }
    } ) );
  }

  addTimeSheet( sheets: TimeSheet[] ) {
    this.http.put<TimeSheet[]>( this.timeSheetUrl + EXT, sheets ).subscribe();
  }

  updateTimeSheet( sheet: TimeSheet, sheetId: number ) {
    this.http.patch<TimeSheet>( this.timeSheetUrl + "/" + sheetId + EXT, sheet ).subscribe();
  }

}
