import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { User } from "./user.model";
import { environment } from "../../environments/environment";
import { catchError, tap } from "rxjs/operators";


export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable( {
               providedIn: "root"
             } )
export class AuthService {

  user = new BehaviorSubject<User>( null );
  private tokenExpTimer: any;

  constructor( private http: HttpClient, private router: Router ) { }

  signUp( email: string, password: string ): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>( "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.APIKey,
                                             { email: email, password: password, returnSecureToken: true } ).pipe(
      catchError( this.handleError ), tap(
        responseData => { this.handleAuth( responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn );} ) );
  }

  public login( email: string, password: string ) {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.APIKey,
      { email: email, password: password, returnSecureToken: true } ).pipe(
      catchError( this.handleError ), tap(
        responseData => { this.handleAuth( responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn );} ) );
  }

  public autoLogin() {
    // Get the user data value from localstorage
    // We are not checking if user exists or not since it is auto-login hence the user is already logged in and has refreshed a page
    const userData: User = JSON.parse( localStorage.getItem( "userData" ) );

    // Double check
    if ( !userData ) {
      return;
    }

    // Temp loaded user
    const loadedUser = new User( userData.email, userData.id, userData.token, userData.tokenExpirationDate );

    if ( loadedUser.token ) {
      // Emit the user as loaded user
      this.user.next( loadedUser );
      // Set the new expiration date and start the auto logout timer
      const expirationDuration = new Date( userData.tokenExpirationDate ).getTime() - new Date().getTime();
      this.autoLogout( expirationDuration );
    }

  }

  public logout() {
    // Set the current user to null aka empty aka logged out
    this.user.next( null );
    // Once user is logged out... Navigate to AuthComponent again
    this.router.navigate( [ "/auth" ] );
    // Remove data from browser storage
    localStorage.removeItem( "userData" );

    // The expiration timer still exists | Clear the timer | Set it to null
    if ( this.tokenExpTimer ) {
      clearTimeout( this.tokenExpTimer );
    }
    this.tokenExpTimer = null;
  }

  private autoLogout( expiration: number ) {
    // Logout after 'expiration' ms and set this to the tokenTimer
    this.tokenExpTimer = setTimeout( () => {this.logout();}, expiration );
  }

  private handleAuth( email: string, localId: string, idToken: string, expireIn: number ) {
    const expiration = new Date( new Date().getTime() + (expireIn * 1000) );  // Create a new time of expiration in milliseconds
    const user = new User( email, localId, idToken, expiration );

    // Notify all the places where this user is subscribed that we have a new user
    this.user.next( user );

    // Auto-logout after the token expires [Can be setup to Infinite manually]
    this.autoLogout( expireIn * 1000 );

    // Save the current user data to the browser data to check if the user is logged in for a later time...
    localStorage.setItem( "userData", JSON.stringify( user ) );

  }

  // Handles the error messages [Basically prints a pretty error message]
  private handleError( errorResponse: HttpErrorResponse ) {
    let msg = "An unknown error occurred!";

    // Check if there exists are field error & error.error in errorResponse [Different for each API]
    if ( !errorResponse.error || !errorResponse.error.error ) {
      return throwError( msg );
    }
    // Check the error message [Some common error message checked]
    switch ( errorResponse.error.error.message ) {
      case "EMAIL_EXISTS":
        msg = "The email address is already in use by another account!";
        break;
      case "OPERATION_NOT_ALLOWED":
        msg = "Password sign-in is disabled for this project!";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        msg = "We have blocked all requests from this device due to unusual activity. Try again" +
          " later!";
        break;
      case "EMAIL_NOT_FOUND":
        msg = "There is no user record corresponding to this identifier. The user may have been deleted!";
        break;
      case "INVALID_PASSWORD":
        msg = "The password is invalid or the user does not have a password!";
        break;
      case "USER_DISABLED":
        msg = "The user account has been disabled by an administrator";
        break;
    }
    return throwError( msg );
  }
}
