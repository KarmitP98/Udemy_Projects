import { Component, OnDestroy, OnInit } from "@angular/core";
import { EmployeeService } from "../shared/employee.service";
import { Employee } from "../shared/model/employee.model";
import { Subscription } from "rxjs";

@Component( {
              selector: "app-profile",
              templateUrl: "./profile.component.html",
              styleUrls: [ "./profile.component.css" ]
            } )
export class ProfileComponent implements OnInit, OnDestroy {

  emp: Employee;
  empSub: Subscription;

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.empSub = this.employeeService.employeeSubject.subscribe( value => {
      this.emp = value;
    } );
  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
  }

}
