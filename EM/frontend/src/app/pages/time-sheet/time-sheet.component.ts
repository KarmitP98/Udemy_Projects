import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TimeSheetService } from "../../shared/time-sheet.service";
import { TimeSheet } from "../../shared/model/time-sheet";
import { NgForm } from "@angular/forms";
import { EmployeeService } from "../../shared/employee.service";
import { MONTHS } from "../annual-leave/annual-leave.component";
import { MatTableDataSource } from "@angular/material";
import { loadTrigger } from "../../shared/shared";

@Component( {
              selector: "app-time-sheet",
              templateUrl: "./time-sheet.component.html",
              styleUrls: [ "./time-sheet.component.css" ],
              animations: [ loadTrigger ]
            } )
export class TimeSheetComponent implements OnInit, OnDestroy {

  timeSheetSub: Subscription;
  empSub: Subscription;
  timeSheets: TimeSheet[] = [];
  allTimeSheets: TimeSheet[] = [];
  @ViewChild( "timeForm", { static: false } ) timeForm: NgForm;
  empId: string;
  displayedColumns = [ "userId", "logDate", "work", "startTime", "endTime", "status", "timeSheetId" ];
  dataSource: MatTableDataSource<TimeSheet>;
  options = [ "ACE 101", "CFF 102", "CFF 209", "ZAS 392", "TTP 119", "DTF 476" ];
  time: string;

  constructor( private timeSheetService: TimeSheetService, private employeeService: EmployeeService ) { }

  ngOnInit() {

    this.empSub = this.employeeService.employeeSubject.subscribe( value => {
      if ( value ) {
        this.empId = value.empId;
      }
    } );

    this.timeSheetSub = this.timeSheetService.fetchTimeSheets( true, this.empId ).subscribe( value => {
      if ( value ) {
        this.timeSheets = value;
        this.loadValues();
      }
    } );
  }

  ngOnDestroy(): void {
    this.timeSheetSub.unsubscribe();
    this.empSub.unsubscribe();
  }

  onSubmit(): void {
    const date = this.timeForm.value.date;
    const tempSheet: TimeSheet = new TimeSheet( this.empId, "placeholder",
                                                MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
                                                this.timeForm.value.startTime, this.timeForm.value.endTime,
                                                this.timeForm.value.work, "Pending", false );
    this.timeSheetService.addTimeSheet( tempSheet );
    this.timeSheets.push( tempSheet );
    this.loadValues();
    this.timeForm.resetForm();
  }

  loadValues(): void {
    this.dataSource = new MatTableDataSource( this.timeSheets );
  }

}
