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
import { TimeReqComponent } from "./admin/time-req/time-req.component";
import { LeaveReqComponent } from "./admin/leave-req/leave-req.component";
import { AdminReqComponent } from "./admin/admin-req/admin-req.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import { DatabaseComponent } from "./database/database.component";

@NgModule( {
             declarations: [
               AppComponent,
               HeaderComponent,
               LoginComponent,
               HomeComponent,
               TimeSheetComponent,
               AnnualLeaveComponent,
               AdminComponent,
               TimeReqComponent,
               LeaveReqComponent,
               AdminReqComponent,
               LoadingSpinnerComponent,
               DatabaseComponent

             ],
             imports: [
               BrowserModule,
               FormsModule,
               HttpClientModule,
               AppRoutingModule,
               BrowserAnimationsModule,
               MatInputModule,
               MatSlideToggleModule,
               MatOptionModule,
               MatSelectModule,
               MatButtonModule,
               MatDatepickerModule,
               MatNativeDateModule,
               MatExpansionModule,
               MatTableModule,
               MatSnackBarModule,
               MatToolbarModule,
               MatCheckboxModule,
               MatSortModule,
               MatRadioModule,
               MatCardModule,
               MatAutocompleteModule,
               MatListModule
             ],
             providers: [],
             bootstrap: [ AppComponent ]
           } )
export class AppModule {}
