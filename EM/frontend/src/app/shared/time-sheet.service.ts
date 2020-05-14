import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TimeSheet } from "./model/time-sheet";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { EmployeeService } from "./employee.service";

@Injectable( {
               providedIn: "root"
             } )
export class TimeSheetService {

  timeSheetSubject = new BehaviorSubject<TimeSheet[]>( null );
  timeSheetUrl = "https://employee-managment-f5252.firebaseio.com/time-sheets.json";
  private timeSheets: TimeSheet[] = [];
  empSub: Subscription;
  timeSheetChanged = new Subject<TimeSheet[]>();
  userId: number;

  constructor( private http: HttpClient, private employeeService: EmployeeService ) { }

  getTimeSheets() {
    return this.timeSheets;
  }

  setTimeSheets( timeSheets: TimeSheet[] ) {
    this.timeSheets = timeSheets;
    this.timeSheetSubject.next( this.getCurrentTimeSheets() );
    this.timeSheetChanged.next( this.timeSheets );
  }

  storeTimeSheets() {
    const timeSheets = this.getTimeSheets();
    this.http.put<TimeSheet[]>( this.timeSheetUrl, timeSheets ).subscribe();
    this.timeSheetChanged.next( this.timeSheets );
  }

  fetchTimeSheets() {
    this.http.get<TimeSheet[]>( this.timeSheetUrl ).pipe( tap( ( sheets ) => {
      if ( sheets ) {
        this.setTimeSheets( sheets );
      }
    } ) ).subscribe();
    this.userId = this.employeeService.getCurrentEmployee().userId;
  }

  addTimeSheet( userId: number, logDate: Date, startTime: Date, endTime: Date, status: string, work: string ) {
    this.timeSheets.push( new TimeSheet( userId, logDate, startTime, endTime, status, this.timeSheets.length, work ) );
    this.storeTimeSheets();
    this.timeSheetSubject.next( this.getCurrentTimeSheets() );
  }

  changeStatus( sheet: TimeSheet, status: string ) {
    for ( let timesheet of this.timeSheets ) {
      if ( timesheet === sheet ) {
        timesheet.status = status;
      }
    }
    this.storeTimeSheets();
    this.timeSheetChanged.next( this.timeSheets );
  }

  getCurrentTimeSheets() {
    let temp: TimeSheet[] = [];
    if ( this.timeSheets ) {
      for ( let sheet of this.timeSheets ) {
        if ( sheet.userId === this.userId ) {
          temp.push( sheet );
        }
      }
    }
    return temp;
  }

}
