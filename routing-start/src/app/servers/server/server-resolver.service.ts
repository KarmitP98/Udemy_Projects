import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ServersService} from "../servers.service";

@Injectable({
  providedIn: "root"
})
export class ServerResolverService implements Resolve<{ id: number, name: string, status: string }> {
  constructor(private serversService: ServersService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          // tslint:disable-next-line:max-line-length
          state: RouterStateSnapshot): Observable<{ id: number; name: string; status: string }> | Promise<{ id: number; name: string; status: string }> | { id: number; name: string; status: string } {
    return this.serversService.getServer(+route.params["id"]);
  }
}
