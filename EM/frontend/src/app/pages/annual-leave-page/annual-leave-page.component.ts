import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component( {
              selector: "app-annual-leave-page",
              templateUrl: "./annual-leave-page.component.html",
              styleUrls: [ "./annual-leave-page.component.css" ]
            } )
export class AnnualLeavePageComponent implements OnInit {

  @ViewChild( "f", { static: false } ) leaveForm: NgForm;


  constructor( private userService: UserService ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const value = this.leaveForm.value;
    console.log( value.startDate );
    this.userService.addLeave( value.startDate, value.endDate, value.reason );
    console.log( this.userService.getCrtUser() );
  }
}
