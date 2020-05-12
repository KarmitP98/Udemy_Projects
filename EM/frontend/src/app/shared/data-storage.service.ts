import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { EmployeeService } from "./employee.service";
import { LeaveService } from "./leave.service";
import { AdminRequestsService } from "./admin-requests.service";

@Injectable( {
               providedIn: "root"
             } )
export class DataStorageService {

  constructor( private http: HttpClient, private userService: EmployeeService, private authService: AuthService,
               private leaveService: LeaveService, private adminRequestsService: AdminRequestsService ) { }


}
