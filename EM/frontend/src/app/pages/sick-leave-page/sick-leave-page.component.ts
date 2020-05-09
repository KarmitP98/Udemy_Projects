import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component( {
              selector: "app-sick-leave-page",
              templateUrl: "./sick-leave-page.component.html",
              styleUrls: [ "./sick-leave-page.component.css" ]
            } )
export class SickLeavePageComponent implements OnInit {

  @ViewChild( "f", { static: false } ) leaveForm: NgForm;

  constructor( private userService: UserService ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const value = this.leaveForm.value;
    console.log( value.startDate );
    this.userService.addLeave( value.startDate, value.endDate, "Sick" );
    console.log( this.userService.getCrtUser() );

  }
}
