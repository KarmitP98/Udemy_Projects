import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  newServerName = '';
  // newServerContent = '';
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() bluePrintCreated = new EventEmitter<{ bluePrintName: string, bluePrintContent: string }>();

  @ViewChild('serverContentInput',{static: false}) serverContentInput: ElementRef;    // Getting reference

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
    console.log(nameInput);
    this.serverCreated.emit({
      serverName: nameInput.value
      , serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint() {
    this.bluePrintCreated.emit({
      bluePrintName: this.newServerName
      , bluePrintContent: this.serverContentInput.nativeElement.value
    });
  }

}
