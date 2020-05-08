import { Injectable } from '@angular/core';

@Injectable( {
               providedIn: 'root'
             } )
export class UsersService {

  users = [ {
    name: "User-1",
    id: 0,
    admin: true,
    loggedIn: false
  }, {
    name: "User-2",
    id: 1,
    admin: false,
    loggedIn: false
  }
  ];
  loggedIn: boolean = false;
  actUserId: number;

  constructor() { }

  login( id: number ): void {
    this.users[id].loggedIn = true;
    this.actUserId = id;
  }

  logout(): void {
    this.users[this.actUserId].loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.users[this.actUserId].loggedIn;
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
