import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit, OnDestroy {

  paramsSub: Subscription;
  user: { id: number, name: string };

  constructor(private route: ActivatedRoute) {
  }

  /*
  Use this to handle the subscriptions manually
   */
  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"], // Only paramaters encoded in the route can be found
      name: this.route.snapshot.params["name"]
    };
    // This is used to update the user when any changes occur.
    // Use this if you are going to call hte component while on the component
    // Subscribes to any changes in the params of the route
    this.paramsSub = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params["id"];
        this.user.name = params["name"];
      }
    );
  }

}
