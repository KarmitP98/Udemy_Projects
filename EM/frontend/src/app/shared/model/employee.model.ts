export class Employee {

  constructor( public userId: number,
               public abv: string,
               public userName: string,
               public userEmail: string,
               public isAdmin: boolean,
               public adminStatus: string,
               public password: string ) {}

}
