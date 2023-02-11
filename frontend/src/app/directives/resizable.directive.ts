import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[resizable]'
})
export class ResizableDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  private isResizing = false;
  @Output('isResizing') ResizingEvent = new EventEmitter();
  @Output('minimizing') MininizingEvent = new EventEmitter();
  private initialWidth = 0;
  private currentX = 0;

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    if (event.offsetX > this.el.nativeElement.offsetWidth - 30) {
      this.isResizing = true;
      // this.initialWidth = this.el.nativeElement.offsetWidth;
      // this.currentX = event.clientX;
      this.ResizingEvent.emit(true);
      this.renderer.setStyle(document.body, 'cursor', 'col-resize');
    }
  }

  @HostListener('document:mouseup') onMouseUp() {
    if (this.isResizing) {
      this.ResizingEvent.emit(false);
      this.isResizing = false;
      this.renderer.setStyle(document.body, 'cursor', 'default');
    }
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      const x = event.clientX;
      const width = window.innerWidth;
      const span = Math.floor(8 * x / width);
      if (x < (width / 7)) {
        this.MininizingEvent.emit(true);
      }
      else {
        this.MininizingEvent.emit(false);
        this.renderer.setStyle(this.el.nativeElement, 'grid-column', `span ${span}`);
      }
    }
  }
}
