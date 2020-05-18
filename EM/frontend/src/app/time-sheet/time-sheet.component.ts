import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TimeSheetService } from "../shared/time-sheet.service";
import { TimeSheet } from "../shared/model/time-sheet";
import { NgForm } from "@angular/forms";
import { EmployeeService } from "../shared/employee.service";
import { MONTHS } from "../annual-leave/annual-leave.component";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatTableDataSource } from "@angular/material";

@Component( {
              selector: "app-time-sheet",
              templateUrl: "./time-sheet.component.html",
              styleUrls: [ "./time-sheet.component.css" ],
              animations: [
                trigger( "formLoad", [
                  state( "in", style( {
                                        opacity: 1,
                                        transform: "translateY(0)"
                                      } ) ),
                  transition( "void => *", [
                    style( { opacity: 0, transform: "translateY(-25px)" } ),
                    animate( 100 )
                  ] )
                ] ),
                trigger( "tableLoad", [
                  state( "in", style( {
                                        opacity: 1,
                                        transform: "translateY(0)"
                                      } ) ),
                  transition( "void => *", [
                    style( { opacity: 0, transform: "translateY(25px)" } ),
                    animate( 100 )
                  ] )
                ] )
              ]
            } )
export class TimeSheetComponent implements OnInit, OnDestroy {

  timeSheetSub: Subscription;
  empSub: Subscription;
  timeSheets: TimeSheet[] = [];
  allTimeSheets: TimeSheet[] = [];
  @ViewChild( "timeForm", { static: false } ) timeForm: NgForm;
  userId: number;
  displayedColumns = [ "userId", "logDate", "work", "startTime", "endTime", "status", "timeSheetId" ];
  dataSource: MatTableDataSource<TimeSheet>;
  options = [ "ACE 101", "CFF 102", "CFF 209", "ZAS 392", "TTP 119", "DTF 476" ];
  today = new Date();

  constructor( private timeSheetService: TimeSheetService, private employeeService: EmployeeService ) { }

  ngOnInit() {

    this.empSub = this.employeeService.employeeSubject.subscribe( value => {
      if ( value ) {
        this.userId = value.userId;
      }
    } );

    this.timeSheetSub = this.timeSheetService.fetchTimeSheets( true, this.userId ).subscribe( value => {
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
    const tempSheet: TimeSheet = new TimeSheet( this.userId, MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
                                                this.timeForm.value.startTime, this.timeForm.value.endTime, "Pending",
                                                this.allTimeSheets ? this.timeSheets.length : 0, this.timeForm.value.work );
    this.timeSheetService.addTimeSheet( tempSheet );
    this.timeSheets.push( tempSheet );
    this.loadValues();
    this.timeForm.resetForm();
  }

  loadValues(): void {
    this.dataSource = new MatTableDataSource( this.timeSheets );
  }

}
