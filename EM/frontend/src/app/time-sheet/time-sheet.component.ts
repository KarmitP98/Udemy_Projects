import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TimeSheetService } from "../shared/time-sheet.service";
import { TimeSheet } from "../shared/model/time-sheet";
import { NgForm } from "@angular/forms";
import { EmployeeService } from "../shared/employee.service";
import { MONTHS } from "../annual-leave/annual-leave.component";

@Component( {
              selector: "app-time-sheet",
              templateUrl: "./time-sheet.component.html",
              styleUrls: [ "./time-sheet.component.css" ]
            } )
export class TimeSheetComponent implements OnInit, OnDestroy {

  timeSheetSub: Subscription;
  empSub: Subscription;
  public timeSheets: TimeSheet[] = [];
  @ViewChild( "timeForm", { static: false } ) timeForm: NgForm;
  userId: number;

  constructor( private timeSheetService: TimeSheetService, private employeeService: EmployeeService ) { }

  ngOnInit() {

    this.empSub = this.employeeService.employeeSubject.subscribe( value => {
      this.userId = value.userId;
    } );

    this.timeSheetSub = this.timeSheetService.fetchTimeSheets( true, this.userId ).subscribe( value => {
      if ( value ) {
        this.timeSheets = value;
      }
    } );
  }

  ngOnDestroy(): void {
    this.timeSheetSub.unsubscribe();
    this.empSub.unsubscribe();
  }

  onSubmit(): void {
    const date = this.timeForm.value.date;
    const tempSheet: TimeSheet = new TimeSheet( this.userId, MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
                                                this.timeForm.value.startTime, this.timeForm.value.endTime, "Pending",
                                                this.timeSheets ? this.timeSheets.length : 0, this.timeForm.value.work );
    this.timeSheets.push( tempSheet );
    this.timeSheetService.addTimeSheet( this.timeSheets );
    this.timeForm.resetForm();
  }
}
