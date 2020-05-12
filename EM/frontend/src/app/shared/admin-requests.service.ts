import { Injectable } from "@angular/core";
import { AdminRequest } from "./model/admin-requests.model";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable( {
               providedIn: "root"
             } )
export class AdminRequestsService {

  reqAdded = new Subject<AdminRequest[]>();
  adminReqServerUrl = "https://employee-managment-f5252.firebaseio.com/adminReq.json";
  private adminReqs: AdminRequest[] = [];

  constructor( private http: HttpClient ) { }

  // Store admin requests to the server
  storeAdminReq() {
    const adminRequests = this.getRequests();
    return this.http.put<AdminRequest[]>( this.adminReqServerUrl, adminRequests ).subscribe();
  }

  // Fetch admin requests from the server
  fetchAdminReq() {
    return this.http.get<AdminRequest[]>( this.adminReqServerUrl ).pipe( tap( req => {this.setRequests( req );} ) ).subscribe();
  }

  getRequests() {
    return this.adminReqs;
  }

  setRequests( req: AdminRequest[] ): void {
    this.adminReqs = req;
    this.reqAdded.next( this.adminReqs );
  }
}
