import { Component, OnDestroy, OnInit } from "@angular/core";
import { LeaveService } from "../../shared/leave.service";
import { Leave } from "../../shared/model/leaves.model";
import { Subscription } from "rxjs";
import { ADMIN_STATUS } from "../../shared/employee.service";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatTableDataSource } from "@angular/material";

@Component( {
              selector: "app-leave-req",
              templateUrl: "./leave-req.component.html",
              styleUrls: [ "./leave-req.component.css" ],
              animations: [
                trigger( "tableLoad", [
                  state( "in", style( {
                                        opacity: 1,
                                        transform: "translateX(0)"
                                      } ) ),
                  transition( "void => *", [
                    style( { opacity: 0, transform: "translateX(-100px)" } ),
                    animate( 100 )
                  ] )
                ] ),
                trigger( "load", [
                  state( "in", style( { opacity: 1 } ) ),
                  transition( "void => *", [
                    style( { opacity: 0 } ),
                    animate( 200 )
                  ] )
                ] )
              ]
            } )
export class LeaveReqComponent implements OnInit, OnDestroy {

  leaves: Leave[] = [];
  leaveSub: Subscription;
  displayedColumns: string[] = [ "select", "userId", "startDate", "endDate", "reason", "status" ];
  selectedReq: Leave;
  dataSource: MatTableDataSource<Leave>;

  constructor( private leaveService: LeaveService ) { }

  ngOnInit() {
    this.leaveSub = this.leaveService.fetchLeaves( false ).subscribe( value => {
      this.leaves = value;
      this.loadValues();
    } );
  }

  ngOnDestroy(): void {
    this.leaveSub.unsubscribe();
  }

  changeStatus( b: boolean ): void {
    this.selectedReq.status = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    this.leaveService.updateLeave( this.selectedReq, this.selectedReq.name );
    this.selectedReq = null;
  }

  removeReq(): void {
    this.leaveService.removeLeave( this.selectedReq.name );
    this.leaves = this.leaves.filter( value => {
      return value.name !== this.selectedReq.name;
    } );
    this.loadValues();
    this.selectedReq = null;
  }

  loadValues() {
    this.dataSource = new MatTableDataSource<Leave>( this.leaves );
  }
}
