import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../user/user.model";
import { Leave } from "../user/leave.model";
import { TimeSheet } from "../user/time-sheet-model.model";

@Injectable( {
               providedIn: "root"
             } )
export class UserService {
  users: User[] = [];
  usersChanged = new Subject<User[]>();
  empId = -1;
  leaveId = 0;
  timeSheetId = 0;
  crtUser: User;

  constructor() { }

  getUsers(): User[] {
    return this.users;
  }

  // Get a user
  getUser( id: number ): User {
    return this.users[id];
  }

  getCrtUser(): User {
    return this.users[this.empId];
  }

  // Add another user
  addUser( name: string, password: string, abv: string, email: string, admin: boolean ): void {
    this.users.push( new User( name, password, abv, this.users.length, email, admin, false, [], [] ) );
    this.usersChanged.next( this.users.slice() );
  }

  setUsers( users: User[] ) {
    this.users = users;
    this.usersChanged.next( this.users.slice() );
  }

  // Change Admin status of other users
  changeAdmin( id: number, newAdmin: boolean ): void {
    this.users[id].admin = newAdmin;
    this.usersChanged.next( this.users.slice() );
  }

  // Login if the credentials are correct
  login( email: string, password: string ): boolean {
    for ( let user of this.users ) {
      if ( user.email === email ) {
        if ( user.password === password ) {
          this.users[user.id].loggedIn = true;
          this.empId = user.id;
          this.timeSheetId = user.timeSheets ? user.timeSheets.length : 0;
          this.leaveId = user.leaves ? user.leaves.length : 0;
          this.crtUser = user;
          console.log( user );
          return true;
        }
      }
    }
    return false;
  }

  // Log out current user
  logout(): void {
    this.users[this.empId].loggedIn = false;
    this.empId = -1;
  }

  // Checks if current user is logged in
  isLoggedIn(): boolean {
    return this.empId === -1 ? false : this.users[this.empId].loggedIn;
  }

  // Checks if current user is admin
  isAdmin(): boolean {
    return this.users[this.empId].admin;
  }

  // Authenticates whether the user is logged in or not
  isAuthenticated(): Promise<any> {
    const promise = new Promise(
      ( resolve, reject ) => {
        setTimeout( () => {
          resolve( this.users[this.empId].loggedIn );
        }, 0 );
      }
    );
    return promise;
  }

  // Adds a leave request for the current user
  addLeave( startDate: Date, endDate: Date, reason: string ) {
    const leave = new Leave( ++this.leaveId, this.empId, startDate, endDate, "Pending", reason );
    this.users[this.empId].addLeave( leave );
    this.usersChanged.next( this.users.slice() );
  }

  // Logs timer for the current user
  logTime( task: string, date: Date, time: number ) {
    const timeSheet = new TimeSheet( this.empId, this.users[this.empId].name, task, date, time, "Pending", ++this.timeSheetId );
    this.users[this.empId].addTimeSheet( timeSheet );
    this.usersChanged.next( this.users.slice() );
  }

  getLeaves(): Leave[] {
    return this.users[this.empId].leaves;
  }

  getTimeSheets(): TimeSheet[] {
    return this.users[this.empId].timeSheets;
  }

  getName(): string {
    return this.users[this.empId].name;
  }

  getId(): number {
    return this.empId;
  }

  getEmail(): string {
    return this.users[this.empId].email;
  }

}
