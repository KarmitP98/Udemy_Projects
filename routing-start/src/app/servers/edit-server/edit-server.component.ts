import {Component, OnInit} from "@angular/core";

import {ServersService} from "../servers.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"]
})
export class EditServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  serverName = "";
  serverStatus = "";
  allowEdit = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) {
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
  }

}
