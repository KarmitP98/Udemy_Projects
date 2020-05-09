import { TimeSheet } from "./time-sheet-model.model";
import { Leave } from "./leave.model";

export class User {

  constructor(
    public name: string,
    public password: string,
    public abv: string,
    public id: number,
    public email: string,
    public admin: boolean,
    public loggedIn: boolean,
    public timeSheets: TimeSheet[],
    public leaves: Leave[]
  ) {}

  addLeave( leave: Leave ): void {
    this.leaves.push( leave );
  }

  addTimeSheet( sheet: TimeSheet ): void {
    this.timeSheets.push( sheet );
  }

}
