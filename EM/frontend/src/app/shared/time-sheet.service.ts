import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TimeSheet } from "./model/time-sheet";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable( {
               providedIn: "root"
             } )
export class TimeSheetService {

  timeSheetChanged = new Subject<TimeSheet[]>();
  timeSheetUrl = "https://employee-managment-f5252.firebaseio.com/time-sheets.json";
  private timeSheets: TimeSheet[] = [];

  constructor( private http: HttpClient ) { }

  getTimeSheets() {
    return this.timeSheets;
  }

  setTimeSheets( timeSheets: TimeSheet[] ) {
    this.timeSheets = timeSheets;
    this.timeSheetChanged.next( this.timeSheets );
  }

  storeTimeSheets() {
    const timeSheets = this.getTimeSheets();
    this.http.put<TimeSheet[]>( this.timeSheetUrl, timeSheets ).subscribe();
  }

  fetchTimeSheets() {
    this.http.get<TimeSheet[]>( this.timeSheetUrl ).pipe( tap( ( sheets ) => {this.setTimeSheets( sheets );} ) ).subscribe();
  }

  addTimeSheet( userId: number, logDate: Date, startTime: Date, endTime: Date, status: string, time: Date ) {
    this.timeSheets.push( new TimeSheet( userId, logDate, startTime, endTime, status, time, this.timeSheets.length ) );
    this.storeTimeSheets();
    this.timeSheetChanged.next( this.timeSheets );
  }

  changeStatus( userId: number, status: string, timeSheetId: number ) {
    for ( let timesheet of this.timeSheets ) {
      if ( timesheet.timeSheetId === timeSheetId ) {
        timesheet.status = status;
      }
    }
    this.storeTimeSheets();
    this.timeSheetChanged.next( this.timeSheets );
  }

}
