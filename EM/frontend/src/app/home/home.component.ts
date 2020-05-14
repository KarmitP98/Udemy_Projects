import { Component, OnDestroy, OnInit } from "@angular/core";
import { EmployeeService } from "../shared/employee.service";
import { Subscription } from "rxjs";

@Component( {
              selector: "app-home",
              templateUrl: "./home.component.html",
              styleUrls: [ "./home.component.css" ]
            } )
export class HomeComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  private sub: Subscription;

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.sub = this.employeeService.employee.subscribe( value => {
      const isAuth = !!value;
      if ( isAuth ) {
        this.isAdmin = value.isAdmin;
      } else {
        this.isAdmin = false;
      }
    } );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
