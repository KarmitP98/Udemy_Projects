import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
             selector : "app-auth",
             templateUrl : "./auth.component.html",
             styleUrls : ["./auth.component.css"]
           })
export class AuthComponent
  implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild("f") form: NgForm;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    }
    else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(data => {
      console.log(data.idToken);
      this.isLoading = false;
      this.router.navigate(["./recipes"]);
    }, errorMsg => {
      console.log(errorMsg);
      this.error = errorMsg;
      this.isLoading = false;
    });

    this.form.reset();
  }
}
