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
  curEmp: Employee;
  userId: number;
  empSub: Subscription;
  curEmpSub: Subscription;

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {

    this.curEmpSub = this.employeeService.employeeSubject.subscribe( value => {
      this.curEmp = value;
    } );

    this.empSub = this.employeeService.fetchEmployees().subscribe( value => {
      this.emps = value.filter( value1 => {
        return value1.userId !== this.curEmp.userId;
      } );
    } );
  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
  }

  changeAdmin( response: boolean, emp: Employee ): void {

    emp.adminStatus = response ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    emp.isAdmin = response;

    this.employeeService.updateEmployee( emp, emp.userId );
  }
}
