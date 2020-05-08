import { Injectable } from "@angular/core";
import { User } from "../user/user.module";
import { Subject } from "rxjs";

@Injectable( {
               providedIn: "root"
             } )
export class UserService {

  users: User[] = [
    new User( "Test1", "test1", 0, "test1@test.com", true, false ),
    new User( "Test2", "test2", 1, "tes2@test.com", false, false ),
    new User( "Test3", "test3", 2, "test3@test.com", true, false )
  ];
  usersChanged = new Subject<User[]>();

  actUserId = -1;

  constructor() { }

  getUser( id: number ): User {
    return this.users[id];
  }

  updateUser( id: number, newUser: User ): void {
    this.users[id] = newUser;
    this.usersChanged.next( this.users.slice() );
  }

  addUser( newUser: User ): void {
    this.users.push( newUser );
    this.usersChanged.next( this.users.slice() );
  }

  changeAdmin( id: number, newAdmin: boolean ): void {
    this.users[id].admin = newAdmin;
    this.usersChanged.next( this.users.slice() );
  }

  login( email: string, password: string ): boolean {
    for ( let user of this.users ) {
      if ( user.email === email ) {
        if ( user.password === password ) {
          this.users[user.id].loggedIn = true;
          this.actUserId = user.id;
          return true;
        }
      }
    }
    return false;
  }

  logout(): void {
    this.users[this.actUserId].loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.actUserId === -1 ? false : this.users[this.actUserId].loggedIn;
  }

  isAdmin(): boolean {
    return this.users[this.actUserId].admin;
  }

  // Authenticates whether the user is logged in or not
  isAuthenticated(): Promise<any> {
    const promise = new Promise(
      ( resolve, reject ) => {
        setTimeout( () => {
          resolve( this.users[this.actUserId].loggedIn );
        }, 0 );
      }
    );
    return promise;
  }
}
