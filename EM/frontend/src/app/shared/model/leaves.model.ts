export class Leave {

  constructor( public userId: number,
               public leaveId: number,
               public startDate: Date,
               public endDate: Date,
               public reason: string,
               public status: string ) {}

}
