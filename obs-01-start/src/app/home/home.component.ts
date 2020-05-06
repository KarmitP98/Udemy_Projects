import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstSub: Subscription;

  constructor() {
  }

  ngOnDestroy(): void {
    this.firstSub.unsubscribe();
  }

  ngOnInit() {
    // this.firstSub = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customObs = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        // Completes the observable
        if (count === 2) {
          observer.complete();
        }
        // Throws an error message
        if (count > 3) {
          observer.error(new Error('Count > 3'));
        }
        count++;
      }, 1000);
    });

    ;

    this.firstSub = customObs.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      alert(error);
    }, () => {
      console.log('Completed!');
    });

  }

}
