import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  inactives = 0;
  actives = 0;

  constructor() {
  }

  incActives() {
    this.actives++;
    console.log('Actives: ' + this.actives);
  }

  incInactives() {
    this.inactives++;
    console.log('Inactives: ' + this.inactives);
  }
}
