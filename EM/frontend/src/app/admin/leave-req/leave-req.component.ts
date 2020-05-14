import { Component, OnDestroy, OnInit } from "@angular/core";
import { LeaveService } from "../../shared/leave.service";
import { Leave } from "../../shared/model/leaves.model";
import { Subscription } from "rxjs";

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
    this.leaveService.fetchLeaves();
    this.leaveSub = this.leaveService.leavesChanged.subscribe( value => {
      this.leaves = value;
    } );
  }

  ngOnDestroy(): void {
    this.leaveSub.unsubscribe();
  }

  changeStatus( b: boolean, leave: Leave ): void {
    this.leaveService.changeLeaveStatus( leave, b ? "Approved" : "Declined" );
  }
}
