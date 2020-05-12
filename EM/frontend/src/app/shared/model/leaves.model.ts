export class Leave {

  constructor( public _userId: number,
               public _leaveId: number,
               public _startDate: Date,
               public _endDate: Date,
               public _reason: string,
               public _status: string ) {}


  get status(): string {
    return this.status;
  }

  set status( value: string ) {
    this.status = value;
  }

  get userId(): number {
    return this.userId;
  }

  set userId( value: number ) {
    this.userId = value;
  }

  get leaveId(): number {
    return this.leaveId;
  }

  set leaveId( value: number ) {
    this.leaveId = value;
  }

  get startDate(): Date {
    return this.startDate;
  }

  set startDate( value: Date ) {
    this.startDate = value;
  }

  get endDate(): Date {
    return this.endDate;
  }

  set endDate( value: Date ) {
    this.endDate = value;
  }

  get reason(): string {
    return this.reason;
  }

  set reason( value: string ) {
    this.reason = value;
  }
}
