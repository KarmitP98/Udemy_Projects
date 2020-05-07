import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component( {
              selector: 'app-root',
              templateUrl: './app.component.html',
              styleUrls: [ './app.component.css' ]
            } )
export class AppComponent implements OnInit {
  signUpForm: FormGroup;
  invalidName = 'Test';
  stages = [
    'Stable', 'Critical', 'Finished'
  ];


  ngOnInit(): void {
    this.signUpForm =
      new FormGroup( {
                       'name': new FormControl( null,
                                                [ Validators.required,
                                                  this.nameValidateSync.bind( this ) ] ),
                       'email': new FormControl( null, [ Validators.required,
                                                         Validators.email ] ),
                       'stage': new FormControl( null, Validators.required )
                     } );

  }

  submit(): void {
    console.log( this.signUpForm.value );
  }

  nameValidateSync( control: FormControl ): { [strKey: string]: boolean } {
    if ( this.invalidName === control.value ) {
      return { 'nameForbidden': true };
    }
    return null;
  }

}
