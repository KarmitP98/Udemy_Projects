import { Component } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { StorageModel } from "./storage.model";
import { Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component( {
              selector: "app-root",
              templateUrl: "./app.component.html",
              styleUrls: [ "./app.component.css" ],
              animations: [
                trigger( "table", [
                  state( "in", style( { transition: "translateX(0)" } ) ),
                  transition( "void => *", [
                    animate( 300, style( { transition: "translateX(-100px)" } ) )
                  ] )
                ] )
              ]
            } )
export class AppComponent {
  title = "Testing";
  index = 0;
  items: Observable<any>;
  dataSource: MatTableDataSource<any>;
  displayed = [ "id", "name" ];

  constructor( private firestore: AngularFireDatabase ) {
  }

  addItem() {
    const data = new StorageModel( "Name " + this.index, this.index++ );
    this.firestore.list( "data" ).push( data );
    this.firestore.list( "data" ).valueChanges().subscribe( value => {
      this.dataSource = new MatTableDataSource<any>( value );
    } );
  }

  deleteTable(): void {
    this.firestore.list( "data" ).remove();
  }

  query( num: number ) {
    this.firestore.list( "data", ref => ref.orderByChild( "id" ).limitToLast( num ) ).valueChanges().subscribe( value => {
      this.dataSource = new MatTableDataSource<any>( value );
    } );
  }
}
