export class TimeSheet {

  constructor( public userId: number,
               public logDate: string,
               public startTime: Date,
               public endTime: Date,
               public status: string,
               public timeSheetId: number,
               public work: string,
               public name?: string ) {}

}
