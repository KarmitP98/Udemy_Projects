import { Component } from "@angular/core";
import { trigger, state, style, transition, animate, keyframes, group } from "@angular/animations";

@Component( {
              selector: "app-root",
              templateUrl: "./app.component.html",
              animations: [
                trigger( "divState", [
                  state( "normal", style( {
                                            backgroundColor: "red",
                                            transform: "translateX(0)"
                                          } ) ),
                  state( "highlighted", style( {
                                                 backgroundColor: "blue",
                                                 transform: "translateX(100px)"
                                               } ) ),
                  transition( "normal => highlighted",
                              animate( 300 ) ),
                  transition( "highlighted => normal",
                              animate( 150 ) )
                ] ),
                trigger( "advanceState", [
                  state( "normal", style( {
                                            backgroundColor: "red",
                                            transform: "translateX(0) scale(1)"
                                          } ) ),
                  state( "highlighted", style( {
                                                 backgroundColor: "blue",
                                                 transform: "translateX(100px) scale(1)"
                                               } ) ),
                  state( "shrunk", style( {
                                            backgroundColor: "green",
                                            transform: "translateX(0px) scale(0.5)"
                                          } ) ),
                  transition( "normal => highlighted",
                              animate( 300 ) ),
                  transition( "highlighted => normal",
                              animate( 300 ) ),
                  transition( "shrunk <=> *", [
                    style( { backgroundColor: "orange", borderRadius: "0px" } ),
                    animate( 1000, style( { borderRadius: "50px" } ) ),
                    animate( 500 )
                  ] )
                ] ),
                trigger( "list1", [
                  state( "in", style( {
                                        opacity: 1,
                                        transform: "translateX(0)"
                                      } ) ),
                  transition( "void => *", [
                    style( { opacity: 0, transform: "translateX(-100px)" } ),
                    animate( 1000 )
                  ] ),
                  transition( "* => void", [
                    animate( 300, style( { transform: "translateX(100px)" } ) )
                  ] )
                ] ),
                trigger( "list2", [
                  state( "in", style( {
                                        opacity: 1,
                                        transform: "translateX(0)"
                                      } ) ),
                  transition( "void => *", [
                                animate( 1000, keyframes( [
                                                            style( { transform: "translateX(-100px)", opacity: 0, offset: 0 } ),
                                                            style( { transform: "translateX(-50px)", opacity: 0.5, offset: 0.3 } ),
                                                            style( { transform: "translateX(-20px)", opacity: 1, offset: 0.8 } ),
                                                            style( { transform: "translateX(0px)", opacity: 1, offset: 1 } )

                                                          ] ) )
                              ]
                  ),
                  transition( "* => void", [
                    group( [
                             animate( 300, style( { color: "red" } ) ),
                             animate( 800, style( { transform: "translateX(100px)" } ) )
                           ] )
                  ] )
                ] ),
                trigger( "errorTrig", [
                  state( "show", style( { opacity: 1 } ) ),
                  transition( "void => *", [ style( { opacity: 0 } ), animate( 800 ) ] ),
                  transition( "* => void", [ animate( 800, style( { opacity: 1 } ) ) ] )
                ] )
              ]
            } )
export class AppComponent {
  list = [ "Milk", "Sugar", "Bread" ];
  state = "normal";
  advanceState = "normal";

  onAdd( item ) {
    this.list.push( item );
  }


  onAnimate(): void {
    this.state === "normal" ? this.state = "highlighted" : this.state = "normal";
    this.advanceState === "normal" ? this.advanceState = "highlighted" : this.advanceState = "normal";
  }

  onShrink(): void {
    this.advanceState = "shrunk";
  }

  onDelete( item: string ): void {
    this.list.splice( this.list.indexOf( item ), 1 );
  }

  animationStarted( $event: any ): void {
    console.log( $event );
  }

  animationEnded( $event: any ): void {
    console.log( $event );
  }
}
