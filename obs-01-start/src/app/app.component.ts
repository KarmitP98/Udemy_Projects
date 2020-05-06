import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  activtedSub: Subscription;
  activated = false;

  constructor(private userService: UserService) {
  }

  ngOnDestroy(): void {
    this.activtedSub.unsubscribe();
  }

  ngOnInit() {
    this.activtedSub = this.userService.activatedEmitter.subscribe((active) => {
      this.activated = active;
    });
  }
}
