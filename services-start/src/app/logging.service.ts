import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() {
  }

  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }

  logAccountAdded(name: string, status: string) {
    console.log('New server: ' + name + '\tStatus: ' + status);
  }

}
