import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { EmployeeService } from "./shared/employee.service";

@Component( {
              selector: "app-root",
              templateUrl: "./app.component.html",
              styleUrls: [ "./app.component.css" ]
            } )
export class AppComponent implements OnInit, OnDestroy {
  title = "Employee Management";
  isAuth: boolean = false;
  private sub: Subscription;

  constructor( private employeeService: EmployeeService ) {}

  ngOnInit(): void {
    this.sub = this.employeeService.employee.subscribe( user => {
      this.isAuth = !!user;
    } );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
