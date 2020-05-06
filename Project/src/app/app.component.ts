import { Component } from "@angular/core";

@Component({
             selector : "app-root",
             templateUrl : "./app.component.html",
             styleUrls : ["./app.component.css"]
           })
export class AppComponent {
  title = "Project1";
  loadedFeature = 1;

  onNavigate(type: number) {
    this.loadedFeature = type;
  }


}
