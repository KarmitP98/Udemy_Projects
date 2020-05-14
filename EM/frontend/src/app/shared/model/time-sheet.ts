export class TimeSheet {

  constructor( public userId: number,
               public logDate: Date,
               public startTime: Date,
               public endTime: Date,
               public status: string,
               public timeSheetId: number,
               public work: string ) {}

}
