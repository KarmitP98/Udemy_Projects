import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { AnnualLeavePageComponent } from "./pages/annual-leave-page/annual-leave-page.component";
import { SickLeavePageComponent } from "./pages/sick-leave-page/sick-leave-page.component";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";
import { DashboardPageComponent } from "./pages/dashboard-page/dashboard-page.component";
import { ToolbarComponent } from "./pages/toolbar/toolbar.component";
import { TimesheetPageComponent } from "./pages/timesheet-page/timesheet-page.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { FormsModule } from "@angular/forms";
import { SignupComponent } from "./pages/signup/signup.component";
import { UserService } from "./services/user.service";
import { LoginGaurdService } from "./services/login-gaurd.service";
import { AdminService } from "./services/admin.service";
import { LeaveReqComponent } from "./pages/admin-page/leave-req/leave-req.component";
import { AdminReqComponent } from "./pages/admin-page/admin-req/admin-req.component";
import { TimeReqComponent } from "./pages/admin-page/time-req/time-req.component";
import { HttpClientModule } from "@angular/common/http";

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
               TimesheetPageComponent,
               SignupComponent,
               LeaveReqComponent,
               AdminReqComponent,
               TimeReqComponent
             ],
             imports: [
               BrowserModule,
               AppRoutingModule,
               FormsModule,
               HttpClientModule
             ],
             providers: [ UserService, LoginGaurdService, AdminService ],
             bootstrap: [ AppComponent ]
           } )
export class AppModule {}
