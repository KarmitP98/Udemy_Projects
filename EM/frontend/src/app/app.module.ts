import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";

@NgModule( {
             declarations: [
               AppComponent,
               HeaderComponent
             ],
             imports: [
               BrowserModule,
               FormsModule,
               HttpClientModule,
               RouterModule
             ],
             providers: [],
             bootstrap: [ AppComponent ]
           } )
export class AppModule {}
