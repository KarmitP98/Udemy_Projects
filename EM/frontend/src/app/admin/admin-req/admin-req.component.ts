import { Component, OnDestroy, OnInit } from "@angular/core";
import { ADMIN_STATUS, EmployeeService } from "../../shared/employee.service";
import { Employee } from "../../shared/model/employee.model";
import { Subscription } from "rxjs";

@Component( {
              selector: "app-admin-req",
              templateUrl: "./admin-req.component.html",
              styleUrls: [ "./admin-req.component.css" ]
            } )
export class AdminReqComponent implements OnInit, OnDestroy {

  emps: Employee[] = [];
  userId: number;
  empSub: Subscription;

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.userId = this.employeeService.employeeSubject.getValue().userId;
    this.empSub = this.employeeService.employeeChanged.subscribe( value => {
      this.emps = [];
      for ( let emp of value ) {
        if ( emp.userId !== this.userId ) {
          this.emps.push( emp );
        }
      }
    } );
    this.employeeService.fetchEmployees();
  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
  }

  changeAdmin( type: boolean, emp: Employee ): void {
    this.employeeService.changeAdminStatus( emp.userName, type ? ADMIN_STATUS.approved : ADMIN_STATUS.declined );
  }
}
