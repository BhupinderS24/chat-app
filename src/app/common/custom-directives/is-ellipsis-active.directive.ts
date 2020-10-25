import { Directive, ElementRef, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[isEllipsisActive]'
})
export class IsEllipsisActiveDirective implements AfterViewChecked {

  constructor(private elementRef: ElementRef) { 

  }
  ngAfterViewChecked(): void {
    this.setToolTip();
  }

  setToolTip(){
      const element = this.elementRef.nativeElement;
      if(element.offsetWidth < element.scrollWidth){
        element.title = element.innerHTML;
      }
  }

}

