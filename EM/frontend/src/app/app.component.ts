import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { EmployeeService } from "./shared/employee.service";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component( {
              selector: "app-root",
              templateUrl: "./app.component.html",
              styleUrls: [ "./app.component.css" ],
              animations: [
                trigger( "errorTrig", [
                  state( "show", style( { opacity: 1 } ) ),
                  transition( "void => *", [ style( { opacity: 0 } ), animate( 300 ) ] ),
                  transition( "* => void", [ animate( 300, style( { opacity: 1 } ) ) ] )
                ] )
              ]
            } )
export class AppComponent implements OnInit, OnDestroy {
  title = "Employee Management";
  isAuth: boolean = false;
  private sub: Subscription;

  constructor( private employeeService: EmployeeService ) {}

  ngOnInit(): void {
    this.sub = this.employeeService.employeeSubject.subscribe( user => {
      this.isAuth = !!user;
    } );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
