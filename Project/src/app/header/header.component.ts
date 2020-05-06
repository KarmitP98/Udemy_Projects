import { Component, EventEmitter, Output } from "@angular/core";

@Component({
             selector : "app-header",
             templateUrl : "./header.component.html"
           })
export class HeaderComponent {

  @Output("type") featureSelected = new EventEmitter<number>();

  onSelect(type: number) {
    this.featureSelected.emit(type);
  }

}
