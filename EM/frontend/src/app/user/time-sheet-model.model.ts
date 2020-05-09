export class TimeSheet {

  constructor( public empId: number,
               public empName: string,
               public task: string,
               public date: Date,
               public time: number,
               public status: string,
               public timeId: number ) {}

}
