import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { LeaveService } from "../shared/leave.service";
import { EmployeeService } from "../shared/employee.service";
import { Subscription } from "rxjs";
import { Leave } from "../shared/model/leaves.model";
import { NgForm } from "@angular/forms";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatTableDataSource } from "@angular/material";

export const MONTHS = [ "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December" ];

@Component( {
              selector: "app-annual-leave",
              templateUrl: "./annual-leave.component.html",
              styleUrls: [ "./annual-leave.component.css" ],
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
export class AnnualLeaveComponent implements OnInit, OnDestroy {

  leaveSub: Subscription;
  empSub: Subscription;
  currentLeaves: Leave[] = [];
  allLeaves: Leave[] = [];
  userId: number;
  @ViewChild( "leaveForm", { static: false } ) leaveForm: NgForm;
  displayedColumns = [ "userId", "startDate", "endDate", "reason", "status", "leaveId" ];
  dataSource: any;

  constructor( private leaveService: LeaveService, private employeeService: EmployeeService ) { }

  ngOnInit() {

    this.empSub = this.employeeService.employeeSubject.subscribe( value => {
      if ( value ) {
        this.userId = value.userId;
      }
    } );

    this.leaveSub = this.leaveService.fetchLeaves( false ).subscribe( value => {
      if ( value ) {
        this.allLeaves = value;
        this.currentLeaves = this.getCurrentLeaves();
        this.dataSource = new MatTableDataSource( this.currentLeaves );
      }
    } );

  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
    this.leaveSub.unsubscribe();
  }

  onSubmit(): void {
    const startDate = new Date( this.leaveForm.value.startDate );
    const endDate = new Date( this.leaveForm.value.endDate );
    const tempLeave =
      new Leave( this.userId, this.allLeaves.length,
                 MONTHS[startDate.getMonth()] + " " + startDate.getDate() + ", " + startDate.getFullYear(),
                 MONTHS[endDate.getMonth()] + " " + endDate.getDate() + ", " + endDate.getFullYear(), this.leaveForm.value.reason,
                 "Pending", "" );
    this.allLeaves.push( tempLeave );
    this.leaveService.addLeave( this.allLeaves );
    this.leaveForm.resetForm();
  }

  getCurrentLeaves() {
    return this.allLeaves.filter( value => {
      return value.userId === this.userId;
    } );
  }

}
