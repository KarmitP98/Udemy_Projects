import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { AuthGuard } from "../auth/auth.guard";
import { TimeSheetComponent } from "../time-sheet/time-sheet.component";
import { AnnualLeaveComponent } from "../annual-leave/annual-leave.component";
import { AdminComponent } from "../admin/admin.component";
import { LoginComponent } from "../login/login.component";
import { TimeReqComponent } from "../admin/time-req/time-req.component";
import { AdminReqComponent } from "../admin/admin-req/admin-req.component";
import { LeaveReqComponent } from "../admin/leave-req/leave-req.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: "time-sheet", component: TimeSheetComponent, canActivate: [ AuthGuard ] },
  { path: "annual-leave", component: AnnualLeaveComponent, canActivate: [ AuthGuard ] },
  {
    path: "admin", component: AdminComponent, canActivate: [ AuthGuard ], children: [
      { path: "time-req", component: TimeReqComponent, canActivate: [ AuthGuard ] },
      { path: "admin-req", component: AdminReqComponent, canActivate: [ AuthGuard ] },
      { path: "leave-req", component: LeaveReqComponent, canActivate: [ AuthGuard ] }
    ]
  }
];

@NgModule( {
             declarations: [],
             imports: [
               CommonModule, RouterModule.forRoot( routes )
             ],
             exports: [ RouterModule ]
           } )
export class AppRoutingModule {}
