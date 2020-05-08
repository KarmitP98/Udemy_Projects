import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "../pages/login-page/login-page.component";
import { HomePageComponent } from "../pages/home-page/home-page.component";
import { TimesheetPageComponent } from "../pages/timesheet-page/timesheet-page.component";
import { AnnualLeavePageComponent } from "../pages/annual-leave-page/annual-leave-page.component";
import { SickLeavePageComponent } from "../pages/sick-leave-page/sick-leave-page.component";
import { AdminPageComponent } from "../pages/admin-page/admin-page.component";
import { SignupComponent } from "../pages/signup/signup.component";


const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginPageComponent },
    { path: "home", component: HomePageComponent },
    { path: "time-sheet", component: TimesheetPageComponent },
    { path: "annual-leave", component: AnnualLeavePageComponent },
    { path: "sick-leave", component: SickLeavePageComponent },
    { path: "admin", component: AdminPageComponent },
    { path: "signup", component: SignupComponent }
  ]
;

@NgModule( {
             imports: [ RouterModule.forRoot( routes ) ],
             exports: [ RouterModule ]
           } )

export class AppRoutingModule {

}
