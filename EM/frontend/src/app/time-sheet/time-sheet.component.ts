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
  public timeSheets: TimeSheet[] = [];
  @ViewChild( "timeForm", { static: false } ) timeForm: NgForm;
  userId: number;

  constructor( private timeSheetService: TimeSheetService, private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.userId = this.employeeService.getCurrentEmployee().userId;
    this.timeSheetSub = this.timeSheetService.fetchTimeSheets( true, this.userId ).subscribe( value => {
      this.timeSheets = value;
    } );
  }

  ngOnDestroy(): void {
    this.timeSheetSub.unsubscribe();
  }

  onSubmit(): void {
    const tempSheet = new TimeSheet( this.userId, this.timeForm.value.date, this.timeForm.value.startTime,
                                     this.timeForm.value.endTime, "Pending", this.timeSheets.length,
                                     this.timeForm.value.work );
    this.timeSheets.push( tempSheet );
    this.timeSheetService.addTimeSheet( this.timeSheets );
    this.timeForm.reset();
  }
}
