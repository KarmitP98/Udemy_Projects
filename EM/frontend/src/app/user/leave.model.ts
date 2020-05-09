export class Leave {

  constructor( public leaveId: number,
               public empId: number,
               public startDate: Date,
               public endDate: Date,
               public status: string,
               public reason: string ) {}
}
