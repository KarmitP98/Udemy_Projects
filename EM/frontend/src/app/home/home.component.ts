import { Component, OnDestroy, OnInit } from "@angular/core";
import { EmployeeService } from "../shared/employee.service";
import { Subscription } from "rxjs";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component( {
              selector: "app-home",
              templateUrl: "./home.component.html",
              styleUrls: [ "./home.component.css" ],
              animations: [
                trigger( "leftLoad", [
                  state( "in", style( {
                                        opacity: 1,
                                        transform: "translateX(0)"
                                      } ) ),
                  transition( "void => *", [
                    style( { opacity: 0, transform: "translateX(-25px)" } ),
                    animate( 100 )
                  ] )
                ] ), trigger( "rightLoad", [
                  state( "in", style( {
                                        opacity: 1,
                                        transform: "translateX(0)"
                                      } ) ),
                  transition( "void => *", [
                    style( { opacity: 0, transform: "translateX(25px)" } ),
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
export class HomeComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  private sub: Subscription;

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.sub = this.employeeService.employeeSubject.subscribe( value => {
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
