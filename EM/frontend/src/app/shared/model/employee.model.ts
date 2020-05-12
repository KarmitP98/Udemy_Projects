export class Employee {

  constructor( public _userId: number,
               public _abv: string,
               public _userName: string,
               public _userEmail: string,
               public _isAdmin: boolean,
               public _adminStatus: string ) {}


  get adminStatus(): string {
    return this._adminStatus;
  }

  set adminStatus( value: string ) {
    this._adminStatus = value;
  }

  get userId(): number {
    return this.userId;
  }

  set userId( value: number ) {
    this.userId = value;
  }

  get abv(): string {
    return this.abv;
  }

  set abv( value: string ) {
    this.abv = value;
  }

  get userName(): string {
    return this.userName;
  }

  set userName( value: string ) {
    this.userName = value;
  }

  get userEmail(): string {
    return this.userEmail;
  }

  set userEmail( value: string ) {
    this.userEmail = value;
  }

  get isAdmin(): boolean {
    return this.isAdmin;
  }

  set isAdmin( value: boolean ) {
    this.isAdmin = value;
  }
}
