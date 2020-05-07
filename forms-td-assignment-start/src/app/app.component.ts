import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component( {
              selector: 'app-root',
              templateUrl: './app.component.html',
              styleUrls: [ './app.component.css' ]
            } )
export class AppComponent {

  @ViewChild( "form", { static: false } ) form: NgForm;

  submit(): void {
    console.log(
      this.form.value.email + " :: " + this.form.value.type + " :: " +
      this.form.value.password );
  }
}
