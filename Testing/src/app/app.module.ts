import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { MatTableModule } from "@angular/material/table";
import { MatNativeDateModule } from "@angular/material/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

@NgModule( {
             declarations: [
               AppComponent
             ],
             imports: [
               BrowserModule,
               CommonModule,
               HttpClientModule,
               AngularFireModule.initializeApp( environment.firebase ),
               AngularFireDatabaseModule,
               BrowserAnimationsModule,
               MatTableModule,
               MatNativeDateModule,
               MatButtonModule,
               FormsModule,
               MatInputModule
             ],
             providers: [],
             bootstrap: [ AppComponent ]
           } )
export class AppModule {}
