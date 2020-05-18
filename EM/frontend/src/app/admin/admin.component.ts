import { Component, OnInit } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component( {
              selector: "app-admin",
              templateUrl: "./admin.component.html",
              styleUrls: [ "./admin.component.css" ],
              animations: [
                trigger( "buttonLoad", [
                  state( "in", style( {
                                        opacity: 1,
                                        transform: "translateY(0)"
                                      } ) ),
                  transition( "void => *", [
                    style( { opacity: 0, transform: "translateY(-25px)" } ),
                    animate( 100 )
                  ] )
                ] )
              ]
            } )
export class AdminComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
