import { Component, ElementRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component( {
              selector: "app-root",
              templateUrl: "./app.component.html",
              styleUrls: [ "./app.component.css" ]
            } )
export class AppComponent {
  answer = "";
  @ViewChild( "f", { static: false } ) form: NgForm;
  user = {
    username: "",
    email: "",
    question: "",
    answer: ""
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = "Superuser";
    // this.form.setValue( {
    //                       userData: {
    //                         username: suggestedName,
    //                         email: ""
    //                       },
    //                       secret: "pet",
    //                       question: ""
    //                     } );

    // This is a better approach to change values.
    this.form.form.patchValue( {
                                 userData: {
                                   username: suggestedName
                                 }
                               } );
  }

  submit(): void {
    // console.log( "Username: " + this.form.value["username"] +
    //                "Email: " + this.form.value["email"] +
    //                "Secret Question: " + this.form.value["secret"] );
    console.log( this.form );
    this.user.username  = this.form.value.userData.username;
    this.user.email  = this.form.value.userData.email;
    this.user.question  = this.form.value.secret;
    this.user.answer  = this.form.value.question;
    this.submitted = true;

    this.form.resetForm();
  }
}
