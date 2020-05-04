import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input('defaultColor') defaultColor = 'transparent';
  @Input('highLightColor') highLightcolor = 'yellow';
  @HostBinding('style.backgroundColor') backgroundColor = this.defaultColor;

  // Binding to a property of the element rather than using the renderer

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
    // Better approach to access the component [No access to DOM sometimes]
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.highLightcolor;
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'transparent');
  }

  // Both the above events are supported events by the DOM API. [Need to know what all the events are]


}
