import { Component, OnInit } from "@angular/core";
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs";
import { log } from "util";

@Component( {
              selector: "app-root",
              templateUrl: "./app.component.html",
              styleUrls: [ "./app.component.css" ]
            } )
export class AppComponent implements OnInit {
  genders = [ "male", "female" ];
  singupForm: FormGroup;
  forbiddenUsernames = [ "Voldemort", "Harry" ];


  ngOnInit(): void {
    this.singupForm =
      new FormGroup( {
                       "username": new FormControl( null
                         , [ Validators.required,
                             this.forbiddenNamesValidate.bind( this ) ] ),
                       "email": new FormControl( null,
                                                 [ Validators.required,
                                                   Validators.email ],
                                                 this.forbiddenEmailsValidate ),
                       "gender": new FormControl( "male" ),
                       "hobbies": new FormArray( [] )
                     } );
    this.singupForm.valueChanges.subscribe(
      (value => console.log( value ))
    );
    // this.singupForm.statusChanges.subscribe(
    //   (status => console.log(status))
    // );

    this.singupForm.patchValue( {
                                  "username": "Max"
                                } );

  }

  submit(): void {
    console.log( this.singupForm );
  }

  addHobby(): void {
    const control = new FormControl( null, Validators.required );
    (<FormArray>this.singupForm.get( "hobbies" )).push( control );
  }

  getControls() {
    return (<FormArray>this.singupForm.get( "hobbies" )).controls;
  }

  // Return the object either true or null. NO FALSE
  forbiddenNamesValidate( control: FormControl ): { [strkey: string]: boolean } {
    if ( this.forbiddenUsernames.indexOf( control.value ) !== -1 ) {
      return { "nameForbidden": true };
    }
    return null;
  }

  forbiddenEmailsValidate( control: FormControl ):
    Promise<any> | Observable<any> {
    const promise = new Promise<any>( ( resolve, reject ) => {
      setTimeout( () => {
        if ( control.value === "test@test.com" ) {
          resolve( { "emailForbidden": true } );
        } else {resolve( null ); }
      }, 1000 );
    } );
    return promise;
  }

}
