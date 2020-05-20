import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Employee } from "../shared/model/employee.model";
import { Leave } from "../shared/model/leaves.model";
import { TimeSheet } from "../shared/model/time-sheet";
import { EmployeeService } from "../shared/employee.service";
import { LeaveService } from "../shared/leave.service";
import { TimeSheetService } from "../shared/time-sheet.service";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component( {
              selector: "app-database",
              templateUrl: "./database.component.html",
              styleUrls: [ "./database.component.css" ],
              animations: [ ,
                trigger( "load", [
                  state( "in", style( { opacity: 1 } ) ),
                  transition( "void => *", [
                    style( { opacity: 0 } ),
                    animate( 200 )
                  ] )
                ] ) ]
            } )
export class DatabaseComponent implements OnInit {

  empDataSource: MatTableDataSource<Employee>;
  leaveDataSource: MatTableDataSource<Leave>;
  timeDataSource: MatTableDataSource<TimeSheet>;
  empDisplay = [ "userId", "abv", "userName", "userEmail", "password", "adminStatus" ];
  timeDisplay = [ "userId", "logDate", "startTime", "endTime", "work", "status" ];
  leaveDisplay = [ "userId", "startDate", "endDate", "reason", "status" ];

  constructor( private employeeService: EmployeeService, private leaveService: LeaveService, private timeSheetService: TimeSheetService ) { }

  ngOnInit() {
    this.employeeService.fetchEmployees().subscribe( value => {
      if ( value ) {
        this.empDataSource = new MatTableDataSource<Employee>( value );
      }
    } );

    this.leaveService.fetchLeaves( false ).subscribe( value => {
      if ( value ) {
        this.leaveDataSource = new MatTableDataSource<Leave>( value );
      }
    } );

    this.timeSheetService.fetchTimeSheets( false ).subscribe( value => {
      if ( value ) {
        this.timeDataSource = new MatTableDataSource<TimeSheet>( value );
      }
    } );
  }

}
