import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
/**
 * A directive that makes its parent element be resizeable from the right,
 * it is based on grid-column, span adjusting so it will be needed to
 * be applied on a grid item preferably with auto-fit settings for the grid.
 */
@Directive({
  selector: '[resizable]'
})
export class ResizableDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  private isResizing = false;
  @Output('isResizing') ResizingEvent = new EventEmitter();
  @Output('minimizing') MininizingEvent = new EventEmitter();

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    if (event.offsetX > this.el.nativeElement.offsetWidth - 30) {
      this.isResizing = true;
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
      const span = Math.floor(6 * x / width);
      if (span == 0) {
        this.MininizingEvent.emit(true);
      }
      else {
        this.MininizingEvent.emit(false);
        this.renderer.setStyle(this.el.nativeElement, 'grid-column', `span ${span}`);
      }
    }
  }
}
