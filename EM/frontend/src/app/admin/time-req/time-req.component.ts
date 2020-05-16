import { Component, OnDestroy, OnInit } from "@angular/core";
import { TimeSheetService } from "../../shared/time-sheet.service";
import { TimeSheet } from "../../shared/model/time-sheet";
import { Subscription } from "rxjs";

@Component( {
              selector: "app-time-req",
              templateUrl: "./time-req.component.html",
              styleUrls: [ "./time-req.component.css" ]
            } )
export class TimeReqComponent implements OnInit, OnDestroy {

  timeSheets: TimeSheet[] = [];
  timeSheetSub: Subscription;

  constructor( private timeSheetService: TimeSheetService ) { }

  ngOnInit() {
    this.timeSheetSub = this.timeSheetService.fetchTimeSheets( false ).subscribe( value => {
      this.timeSheets = value;
    } );
  }

  ngOnDestroy(): void {
    this.timeSheetSub.unsubscribe();
  }

  changeStatus( b: boolean, sheet: TimeSheet ): void {
    sheet.status = b ? "Approved" : "Declined";
    this.timeSheetService.updateTimeSheet( sheet, sheet.timeSheetId );
  }
}
