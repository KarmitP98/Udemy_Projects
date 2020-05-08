import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


@NgModule( {
             declarations: [],
             imports: [
               CommonModule
             ]
           } )
export class User {

  constructor( public name: string,
               public password: string,
               public id: number,
               public email: string,
               public admin: boolean,
               public loggedIn: boolean ) {}

}
