import {Component, OnInit} from "@angular/core";

import {ServersService} from "../servers.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CanComponentDeactivate} from "./can-deactivate-gaurd.service";
import {Observable} from "rxjs";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"]
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {

  changeSaved = false;

  server: { id: number, name: string, status: string };
  serverName = "";
  serverStatus = "";
  allowEdit = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.serverName || this.serverStatus) &&
      !this.changeSaved) {
      return confirm("Do you want to discard the changes?");
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.server = this.serversService.getServer(+this.route.snapshot.params["id"]);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    // Get the value of queryparams and fragment
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.route.queryParams.subscribe(
      (qParams: Params) => {
        this.allowEdit = qParams["allowEdit"] === "1" ? true : false;
      }
    );

  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changeSaved = true;
    this.router.navigate(["../"], {relativeTo: this.route});
  }

}
