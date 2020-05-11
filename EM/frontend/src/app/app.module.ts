import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from "./auth/auth.component";

@NgModule( {
             declarations: [
               AppComponent,
               AuthComponent
             ],
             imports: [
               BrowserModule,
               FormsModule,
               HttpClientModule
             ],
             providers: [],
             bootstrap: [ AppComponent ]
           } )
export class AppModule {}
