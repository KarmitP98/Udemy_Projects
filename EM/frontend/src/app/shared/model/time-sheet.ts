export class TimeSheet {

  constructor( public userId: number,
               public logDate: Date,
               public startTime: Date,
               public endTime: Date,
               public status: string,
               public time: Date,
               public timeSheetId: number ) {}

}
