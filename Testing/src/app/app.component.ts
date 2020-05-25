import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { StorageModel } from "./storage.model";
import { Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { NgForm } from "@angular/forms";

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
export class AppComponent implements OnInit {
  title = "Testing";
  index = 0;
  items: Observable<any>;
  dataSource: MatTableDataSource<any>;
  displayed = [ "id", "name" ];
  date = new Date();
  time: string = this.date.getHours() + ":" + this.date.getMinutes();
  @ViewChild( "form", { static: false } ) form: NgForm;

  constructor( private firestore: AngularFireDatabase ) {
  }

  ngOnInit(): void {}

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
    this.firestore.list<StorageModel>( "data", ref => ref.orderByChild( "id" ).equalTo( 2 ) ).valueChanges().subscribe( value => {
      console.log( value );
      this.dataSource = new MatTableDataSource<any>( value );
    } );
  }

  onSubmit(): void {
    console.log( this.time );
    const startTime: number = this.form.value.startTime;
    const endTime: number = this.form.value.endTime;

    console.log( startTime );
    console.log( endTime );
    console.log( endTime - startTime );
  }
}
