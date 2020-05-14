import { Component, OnDestroy, OnInit } from "@angular/core";
import { TimeSheetService } from "../../shared/time-sheet.service";
import { TimeSheet } from "../../shared/model/time-sheet";
import { Subscription } from "rxjs";
import { ADMIN_STATUS } from "../../shared/employee.service";

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
    this.timeSheetService.fetchTimeSheets();
    this.timeSheetSub = this.timeSheetService.timeSheetChanged.subscribe( value => {
      this.timeSheets = value;
    } );
  }

  ngOnDestroy(): void {
    this.timeSheetSub.unsubscribe();
  }

  changeStatus( b: boolean, sheet: TimeSheet ): void {
    this.timeSheetService.changeStatus( sheet, b ? ADMIN_STATUS.approved : ADMIN_STATUS.declined );
  }
}
