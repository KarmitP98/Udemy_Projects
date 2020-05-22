import { Component } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { StorageModel } from "./storage.model";
import { Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";

@Component( {
              selector: "app-root",
              templateUrl: "./app.component.html",
              styleUrls: [ "./app.component.css" ]
            } )
export class AppComponent {
  title = "Testing";
  index = 0;
  items: Observable<any>;
  dataSource: MatTableDataSource<any>;

  constructor( private firestore: AngularFireDatabase ) {
  }

  addItem() {
    const data = new StorageModel( "Name " + this.index, this.index++ );
    this.firestore.list( "data" ).push( data );
    this.items = this.firestore.list( "data" ).valueChanges();
  }


  deleteTable(): void {
    this.firestore.list( "data" ).remove();
  }

  query(num: number) {
    this.items = this.firestore.list("data", ref => ref.orderByChild("id").limitToLast(num)).valueChanges();
  }
}
