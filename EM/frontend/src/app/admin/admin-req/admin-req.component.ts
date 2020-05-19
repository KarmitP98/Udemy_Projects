import { Component, OnDestroy, OnInit } from "@angular/core";
import { ADMIN_STATUS, EmployeeService } from "../../shared/employee.service";
import { Employee } from "../../shared/model/employee.model";
import { Subscription } from "rxjs";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatTableDataSource } from "@angular/material";

@Component( {
              selector: "app-admin-req",
              templateUrl: "./admin-req.component.html",
              styleUrls: [ "./admin-req.component.css" ],
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
export class AdminReqComponent implements OnInit, OnDestroy {

  emps: Employee[] = [];
  curEmp: Employee;
  userId: number;
  empSub: Subscription;
  curEmpSub: Subscription;
  selectedReq: Employee;
  displayedColumns = [ "select", "userId", "abv", "userName", "userEmail", "adminStatus" ];
  dataSource: MatTableDataSource<Employee>;

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {

    this.curEmpSub = this.employeeService.employeeSubject.subscribe( value => {
      this.curEmp = value;
    } );

    this.empSub = this.employeeService.fetchEmployees().subscribe( ( value: Employee[] ) => {
      this.emps = value.filter( value1 => {
        return value1.userId !== this.curEmp.userId;
      } );
      this.loadValues();
    } );
  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
  }

  changeAdmin( response: boolean ): void {

    this.selectedReq.adminStatus = response ? ADMIN_STATUS.approved : ADMIN_STATUS.declined;
    this.selectedReq.isAdmin = response;

    this.employeeService.updateEmployee( this.selectedReq, this.selectedReq.name );
    this.selectedReq = null;
  }

  loadValues() {
    this.dataSource = new MatTableDataSource<Employee>( this.emps );
  }

}
