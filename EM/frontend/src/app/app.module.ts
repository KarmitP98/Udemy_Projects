import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { TimeSheetComponent } from "./time-sheet/time-sheet.component";
import { AnnualLeaveComponent } from "./annual-leave/annual-leave.component";
import { AdminComponent } from "./admin/admin.component";

@NgModule( {
             declarations: [
               AppComponent,
               HeaderComponent,
               LoginComponent,
               HomeComponent,
               TimeSheetComponent,
               AnnualLeaveComponent,
               AdminComponent

             ],
             imports: [
               BrowserModule,
               FormsModule,
               HttpClientModule,
               AppRoutingModule
             ],
             providers: [],
             bootstrap: [ AppComponent ]
           } )
export class AppModule {}
