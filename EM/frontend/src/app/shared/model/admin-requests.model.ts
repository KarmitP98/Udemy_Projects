export class AdminRequest {

  constructor( public _userId: number,
               public _adminReqId: number,
               public _status: string ) {}


  get userId(): number {
    return this.userId;
  }

  set userId( value: number ) {
    this.userId = value;
  }

  get adminReqId(): number {
    return this.adminReqId;
  }

  set adminReqId( value: number ) {
    this.adminReqId = value;
  }

  get status(): string {
    return this.status;
  }

  set status( value: string ) {
    this.status = value;
  }
}
