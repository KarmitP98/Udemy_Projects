export class TimeSheet {

  constructor( public _userId,
               public _logDate: Date,
               public _startTime: Date,
               public _endTime: Date,
               public _status: string,
               public _time: Date,
               public _timeSheetId: number ) {}

  get timeSheetId(): number {
    return this.timeSheetId;
  }

  set timeSheetId( value: number ) {
    this.timeSheetId = value;
  }

  get time(): Date {
    return this.time;
  }

  set time( value: Date ) {
    this.time = value;
  }

  get userId() {
    return this.userId;
  }

  set userId( value ) {
    this.userId = value;
  }

  get logDate(): Date {
    return this.logDate;
  }

  set logDate( value: Date ) {
    this.logDate = value;
  }

  get startTime(): Date {
    return this.startTime;
  }

  set startTime( value: Date ) {
    this.startTime = value;
  }

  get endTime(): Date {
    return this.endTime;
  }

  set endTime( value: Date ) {
    this.endTime = value;
  }

  get status(): string {
    return this.status;
  }

  set status( value: string ) {
    this.status = value;
  }
}
