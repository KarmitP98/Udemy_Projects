import {Component, OnInit} from "@angular/core";

import {ServersService} from "../servers.service";
import {ActivatedRoute, Data, Router} from "@angular/router";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"]
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    // Adding '+' casts the string to a number
    // const id = +this.route.snapshot.params["id"];
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     const ids = +params["id"];
    //     this.server = this.serversService.getServer(+params["id"]);
    //   }
    // );
    //  Resolver used to mimic server loading

    this.route.data.subscribe((data: Data) => {
      this.server = data["server"];
    });
    // Resolve also goes to data
  }

  edit() {
    this.router.navigate(["edit"], {relativeTo: this.route, queryParamsHandling: "preserve"});
    // this.router.navigate(['/server', this.server.name, '/edit']);
    // This is also another way for routing using absolute paths
  }
}
