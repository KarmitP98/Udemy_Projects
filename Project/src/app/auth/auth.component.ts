import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";

@Component({
             selector : "app-auth",
             templateUrl : "./auth.component.html",
             styleUrls : ["./auth.component.css"]
           })
export class AuthComponent
  implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild("f") form: NgForm;
  @ViewChild(PlaceholderDirective, {static : false}) alertHost: PlaceholderDirective;
  alertSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
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
      this.error = errorMsg;  // Not necessary since we are passing it to the method
      this.showErrorAlert(errorMsg);
      this.isLoading = false;
    });

    this.form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errorMsg: string) {
    // const alertComponent = new AlertComponent(); THIS IS INVALID

    // This method will return a component factory (Not the object)
    const alertCmpFact = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewCont = this.alertHost.viewContainerRef;
    hostViewCont.clear();

    const compRef = hostViewCont.createComponent(alertCmpFact);
    compRef.instance.alertMessage = errorMsg;
    this.alertSub = compRef.instance.close.subscribe(() => {
      hostViewCont.clear();
      this.alertSub.unsubscribe();
    });
  }
}
