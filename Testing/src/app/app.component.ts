import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component( {
              selector: 'app-root',
              templateUrl: './app.component.html',
              styleUrls: [ './app.component.css' ]
            } )
export class AppComponent {
  title = 'Testing';
  input: number;
  url = 'https://project-1-aa193.firebaseio.com/numbers.json';
  @ViewChild( 'f', { static: false } ) form: NgForm;
  numbers: number[] = [];
  index = 0;

  constructor( private http: HttpClient ) {}

  storeValue(): void {
    this.http.post<number[]>( this.url, this.index++ ).subscribe();
  }

  fetchValue(): void {
    this.http.get( this.url ).pipe( map( value => {
      const nums = [];
      // tslint:disable-next-line:forin
      for ( const key in value ) {
        nums.push( value[key] );
      }
      return nums;
    } ) ).subscribe( value => {
      console.log( value );
    } );
  }
}
