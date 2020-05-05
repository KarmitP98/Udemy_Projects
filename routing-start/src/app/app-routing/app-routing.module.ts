import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {UsersComponent} from "../users/users.component";
import {UserComponent} from "../users/user/user.component";
import {ServersComponent} from "../servers/servers.component";
import {ServerComponent} from "../servers/server/server.component";
import {EditServerComponent} from "../servers/edit-server/edit-server.component";
import {AuthGuardService} from "../auth-guard.service";
import {CanDeactivateGaurd} from "../servers/edit-server/can-deactivate-gaurd.service";
import {ErrorPageComponent} from "../error-page/error-page.component";
import {ServerResolverService} from "../servers/server/server-resolver.service";

// Routes for the routes to each page
const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {
    path: "users", component: UsersComponent, children: [
      {path: ":id/:name", component: UserComponent}
    ]
  },
  {
    path: "servers", component: ServersComponent, children: [
      {path: ":id", component: ServerComponent, resolve: {server: ServerResolverService}},
      {path: ":id/edit", component: EditServerComponent, canDeactivate: [CanDeactivateGaurd]},
    ], canActivateChild: [AuthGuardService]
  },
  // {path: "not-found", component: PageNotFoundComponent},
  {path: "not-found", component: ErrorPageComponent, data: {message: "Page not found!"}},
  {path: "**", redirectTo: "/not-found"}
  // ** means catch all paths not declared above it.
  // NOTE always keep this at the end.
];

// children allow the components to be loaded side by side

@NgModule({
  declarations: [],
  imports: [
    // Routes are registered on router module
    // RouterModule.forRoot(appRoutes, {useHash: true}),
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
