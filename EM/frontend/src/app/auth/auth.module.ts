import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  { path: "", component: AuthComponent }
];

@NgModule( {
             declarations: [ AuthComponent ],
             imports: [
               CommonModule,
               RouterModule.forChild( routes ),
               FormsModule,
               HttpClientModule
             ],
             exports: [ RouterModule, CommonModule ]
           } )
export class AuthModule {}
