import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { LeaveService } from "../shared/leave.service";
import { EmployeeService } from "../shared/employee.service";
import { Subscription } from "rxjs";
import { Leave } from "../shared/model/leaves.model";
import { NgForm } from "@angular/forms";

@Component( {
              selector: "app-annual-leave",
              templateUrl: "./annual-leave.component.html",
              styleUrls: [ "./annual-leave.component.css" ]
            } )
export class AnnualLeaveComponent implements OnInit, OnDestroy {

  leaveSub: Subscription;
  private leaves: Leave[] = [];
  userId: number;
  @ViewChild( "leaveForm", { static: false } ) leaveForm: NgForm;

  constructor( private leaveService: LeaveService, private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.userId = this.employeeService.employeeSubject.getValue().userId;

    this.leaveSub = this.leaveService.fetchLeaves( true, this.userId ).subscribe( value => {
      if ( value ) {
        this.leaves = value;
      }
    } );
  }

  ngOnDestroy(): void {
    this.leaveSub.unsubscribe();
  }

  onSubmit(): void {
    const tempLeave =
      new Leave( this.userId, this.leaves.length, this.leaveForm.value.startDate, this.leaveForm.value.endDate, this.leaveForm.value.reason,
                 "Pending" );
    this.leaves.push( tempLeave );
    this.leaveService.addLeave( this.leaves );


    this.leaveForm.resetForm();
  }
}
