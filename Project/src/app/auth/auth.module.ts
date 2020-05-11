import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {path : "", component : AuthComponent}];

@NgModule({
            declarations : [AuthComponent],
            imports : [
              CommonModule,
              HttpClientModule,
              SharedModule,
              RouterModule.forChild(routes),
              FormsModule,
              HttpClientModule
            ],
            exports : [RouterModule,
                       CommonModule
            ]
          })
export class AuthModule {}
