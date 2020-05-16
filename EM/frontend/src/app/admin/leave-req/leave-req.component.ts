import { Component, OnDestroy, OnInit } from "@angular/core";
import { LeaveService } from "../../shared/leave.service";
import { Leave } from "../../shared/model/leaves.model";
import { Subscription } from "rxjs";
import { ADMIN_STATUS } from "../../shared/employee.service";

@Component( {
              selector: "app-leave-req",
              templateUrl: "./leave-req.component.html",
              styleUrls: [ "./leave-req.component.css" ]
            } )
export class LeaveReqComponent implements OnInit, OnDestroy {

  leaves: Leave[] = [];
  leaveSub: Subscription;

  constructor( private leaveService: LeaveService ) { }

  ngOnInit() {
    this.leaveSub = this.leaveService.fetchLeaves( false ).subscribe( value => {
      this.leaves = value;
    } );
  }

  ngOnDestroy(): void {
    this.leaveSub.unsubscribe();
  }

  changeStatus( b: boolean, leave: Leave ): void {
    leave.status = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    this.leaveService.updateLeave( leave, leave.leaveId );
  }
}
