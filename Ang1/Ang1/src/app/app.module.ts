import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthorComponent } from './author.component';
import { AuthorService } from './author.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AuthorService],        // Add all the dependencies that your components depend on here
  bootstrap: [AppComponent]
})
export class AppModule { }
