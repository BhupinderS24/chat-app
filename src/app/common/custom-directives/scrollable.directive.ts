import {
  Directive,
  HostListener,
  EventEmitter,
  Output,
  ElementRef,
} from '@angular/core';
@Directive({
  selector: '[scrollable]',
})
export class ScrollableDirective {
  @Output() scrollPosition = new EventEmitter();
  @Output() scrollPosition2 = new EventEmitter();
  @Output() scrollPosition3 = new EventEmitter();

  constructor(public el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    console.log('onScroll');
    try {
      console.log('Event', event);
      const top = event.target.scrollTop;
      const height = this.el.nativeElement.scrollHeight;
      const offset = this.el.nativeElement.offsetHeight;

      this.scrollPosition2.emit(height);
      this.scrollPosition3.emit(offset);

      // console.log('TOP', top);
      // console.log('Height', height);
      // console.log('offset', offset);

      // emit bottom event
      if (top > height - offset - 1) {
        this.scrollPosition.emit('bottom');
      }

      // emit top event
      if (top === 0) {
        // event.target.scrollTop = height + offset;

        this.scrollPosition.emit('top');
      }
    } catch (err) {}
  }
}
