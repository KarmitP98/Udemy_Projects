import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({providedIn : "root"})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  // token: string = null; This is perfectly fine

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=\n" +
                                            environment.firebaseAPIKey,
                                            {
                                              email : email,
                                              password : password,
                                              returnSecureToken : true
                                            })
               .pipe(catchError(this.handleError),
                     tap(resData => {
                       this.handleAuth(resData.email, resData.idToken, +resData.expiresIn, resData.localId);
                     }));
  }

  login(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
                                            environment.firebaseAPIKey,
                                            {
                                              email : email,
                                              password : password,
                                              returnSecureToken : true
                                            })
               .pipe(catchError(this.handleError),
                     tap(resData => {
                       this.handleAuth(resData.email, resData.idToken, +resData.expiresIn, resData.localId);
                     }));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email,
                                userData.id,
                                userData._token,
                                new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expDur = new Date(userData._tokenExpirationDate).getTime() -
                     new Date().getTime();
      this.autoLogout(expDur);
    }

  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuth(email: string, token: string, expireIn: number, id: string) {
    const expiration = new Date(new Date().getTime() + expireIn * 1000);
    const user = new User(email, id,
                          token, expiration);
    this.user.next(user);
    this.autoLogout(expireIn * 1000);
    // Save the current user data to local sotrage
    localStorage.setItem("userData", JSON.stringify(user));
    // Stringify converts the object to a string
  }

  private handleError(errRes: HttpErrorResponse) {
    let errorMsg = "An unknown error occured!";
    if (!errRes.error || !errRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errRes.error.error.message) {
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
    return throwError(errorMsg);
  }
}
