import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AnnualLeavePageComponent } from './pages/annual-leave-page/annual-leave-page.component';
import { SickLeavePageComponent } from './pages/sick-leave-page/sick-leave-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { TimesheetPageComponent } from './pages/timesheet-page/timesheet-page.component';
import { AppRoutingModule } from "./app-routing/app-routing.module";

@NgModule( {
             declarations: [
               AppComponent,
               LoginPageComponent,
               HomePageComponent,
               AnnualLeavePageComponent,
               SickLeavePageComponent,
               AdminPageComponent,
               DashboardPageComponent,
               ToolbarComponent,
               TimesheetPageComponent
             ],
             imports: [
               BrowserModule,
               AppRoutingModule
             ],
             providers: [],
             bootstrap: [ AppComponent ]
           } )
export class AppModule {}
