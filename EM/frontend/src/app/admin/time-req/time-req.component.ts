import { Component, OnDestroy, OnInit } from "@angular/core";
import { TimeSheetService } from "../../shared/time-sheet.service";
import { TimeSheet } from "../../shared/model/time-sheet";
import { Subscription } from "rxjs";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ADMIN_STATUS } from "../../shared/employee.service";
import { MatTableDataSource } from "@angular/material";


@Component( {
              selector: "app-time-req",
              templateUrl: "./time-req.component.html",
              styleUrls: [ "./time-req.component.css" ],
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
export class TimeReqComponent implements OnInit, OnDestroy {

  timeSheets: TimeSheet[] = [];
  timeSheetSub: Subscription;
  displayedColumns: string[] = [ "select", "userId", "logDate", "startTime", "endTime", "work", "status" ];
  selectedReq: TimeSheet;
  dataSource: MatTableDataSource<TimeSheet>;


  constructor( private timeSheetService: TimeSheetService ) { }

  ngOnInit() {
    this.timeSheetSub = this.timeSheetService.fetchTimeSheets( false ).subscribe( value => {
      this.timeSheets = value;
      this.loadValues();
    } );
  }

  ngOnDestroy(): void {
    this.timeSheetSub.unsubscribe();
  }

  changeStatus( b: boolean ) {
    const status = b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    this.selectedReq.status = status;
    this.timeSheetService.updateTimeSheet( this.selectedReq, this.selectedReq.name );
    this.selectedReq = null;
  }

  removeReq(): void {
    this.timeSheetService.removeTimeSheet( this.selectedReq.name );
    this.timeSheets = this.timeSheets.filter( value => {
      return value.name !== this.selectedReq.name;
    } );
    this.loadValues();
    this.selectedReq = null;
  }

  loadValues() {
    this.dataSource = new MatTableDataSource<TimeSheet>( this.timeSheets );
  }
}
