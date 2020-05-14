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
  currentLeaves: Leave[] = [];
  userId: number;
  @ViewChild( "leaveForm", { static: false } ) leaveForm: NgForm;

  constructor( private leaveService: LeaveService, private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.leaveService.fetchLeaves();
    this.userId = this.employeeService.employeeSubject.getValue().userId;
    this.leaveSub = this.leaveService.leaveSubject.subscribe( value => {
      if ( value ) {
        this.currentLeaves = value;
      }
    } );
  }

  ngOnDestroy(): void {
    this.leaveSub.unsubscribe();
  }

  onSubmit(): void {
    this.leaveService.addLeave( this.userId, this.leaveForm.value.startDate, this.leaveForm.value.endDate, this.leaveForm.value.reason );
    this.leaveForm.resetForm();
  }
}
