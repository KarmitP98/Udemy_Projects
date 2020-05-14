import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TimeSheetService } from "../shared/time-sheet.service";
import { TimeSheet } from "../shared/model/time-sheet";
import { NgForm } from "@angular/forms";
import { EmployeeService } from "../shared/employee.service";

@Component( {
              selector: "app-time-sheet",
              templateUrl: "./time-sheet.component.html",
              styleUrls: [ "./time-sheet.component.css" ]
            } )
export class TimeSheetComponent implements OnInit, OnDestroy {

  timeSheetSub: Subscription;
  public currentTimeSheets: TimeSheet[] = [];
  @ViewChild( "timeForm", { static: false } ) timeForm: NgForm;
  userId: number;
  startTime = new Date();

  constructor( private timeSheetService: TimeSheetService, private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.timeSheetService.fetchTimeSheets();
    this.userId = this.employeeService.getCurrentEmployee().userId;
    this.timeSheetSub = this.timeSheetService.timeSheetSubject.subscribe( value => {
      if ( value ) {
        this.currentTimeSheets = value;
      }
    } );
  }

  ngOnDestroy(): void {
    this.timeSheetSub.unsubscribe();
  }

  onSubmit(): void {

    this.timeSheetService.addTimeSheet( this.userId, this.timeForm.value.date, this.timeForm.value.startTime,
                                        this.timeForm.value.endTime, "Pending",
                                        this.timeForm.value.work );
    this.timeForm.reset();
  }
}
