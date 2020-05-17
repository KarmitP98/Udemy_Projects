export class Leave {

  constructor( public userId: number,
               public leaveId: number,
               public startDate: string,
               public endDate: string,
               public reason: string,
               public status: string,
               public name?: string ) {}

}
