import { Component, OnInit } from '@angular/core';
import { AuthorService } from './author.service';

@Component({
  selector: 'aut',
  template: `<h1>{{ title }}</h1>
              <ul>
              <li *ngFor="let author of authors">{{ author }}</li>
              </ul>  
              `
})
export class AuthorComponent implements OnInit {

  authors;
  title = "3 Authors";

  constructor(service: AuthorService) {
    this.authors = service.getAuthors();
  }

  ngOnInit() {
  }

}
