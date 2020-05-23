import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { EmployeeService } from "./employee.service";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export class User {

  constructor( public email: string,
               public id: string,
               private _token: string,
               private _tokenExpirationDate: Date ) {}

  get token(): string {
    if ( !this._tokenExpirationDate || new Date() > this._tokenExpirationDate ) {
      return null;
    }
    return this._token;
  }
}

@Injectable( {
               providedIn: "root"
             } )
export class AuthenticationService {

  loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  API_KEY = environment.APIKey;
  private tokenExpirationTimer: any;

  constructor( private http: HttpClient, private employeeService: EmployeeService ) { }

  login( email: string, password: string ) {
    return this.http.post<AuthResponseData>( this.loginUrl + this.API_KEY, { email: email, password: password, returnSecureToken: true } )
               .pipe(
                 catchError( this.handleError ),
                 tap( resData => {
                   this.handleAuth( resData.email, resData.idToken, +resData.expiresIn, resData.localId );
                 } ) )
      ;
  }

  signUp( email: string, password: string ): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>( this.signUpUrl + this.API_KEY,
                                             {
                                               email: email,
                                               password: password,
                                               returnSecureToken: true
                                             } )
               .pipe( catchError( this.handleError ),
                      tap( resData => {
                        this.handleAuth( resData.email, resData.idToken, +resData.expiresIn, resData.localId );
                      } ) );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string
    } = JSON.parse( localStorage.getItem( "userData" ) );
    if ( !userData ) {
      return;
    }

    const loadedUser = new User( userData.email,
                                 userData.id,
                                 userData._token,
                                 new Date( userData._tokenExpirationDate ) );

    if ( loadedUser.token ) {
      // this.employeeService.employeeSubject.next( loadedUser );
      const expDur = new Date( userData._tokenExpirationDate ).getTime() -
        new Date().getTime();
      this.autoLogout( expDur );
    }
  }

  autoLogout( expirationDuration: number ) {
    this.tokenExpirationTimer = setTimeout( () => {
      this.logout();
    }, expirationDuration );
  }

  logout(): void {
    if ( this.tokenExpirationTimer ) {
      clearTimeout( this.tokenExpirationTimer );
    }
    this.tokenExpirationTimer = null;
    this.employeeService.logout();
  }

  private handleAuth( email: string, token: string, expireIn: number, id: string ) {
    const expiration = new Date( new Date().getTime() + expireIn * 1000 );
    const user = new User( email, id,
                           token, expiration );
    this.autoLogout( expireIn * 1000 );
    // this.employeeService.login( );
    // this.employeeService.employeeSubject.next( user );
    // // Save the current user data to local sotrage
    // localStorage.setItem( "userData", JSON.stringify( user ) );
    // // Stringify converts the object to a string
  }

  private handleError( errRes: HttpErrorResponse ) {
    let errorMsg = "An unknown error occured!";
    if ( !errRes.error || !errRes.error.error ) {
      return throwError( errorMsg );
    }
    switch ( errRes.error.error.message ) {
      case "EMAIL_EXISTS":
        errorMsg = "The email exists";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg = "This email is invald";
        break;
      case "INVALID_PASSWORD":
        errorMsg = "Pasword is incorrect";
        break;
    }
    return throwError( errorMsg );
  }
}
