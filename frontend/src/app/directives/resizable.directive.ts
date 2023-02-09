import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[resizable]'
})
export class ResizableDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  private isResizing = false;
  private initialWidth = 0;
  private currentX = 0;

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    if (event.offsetX > this.el.nativeElement.offsetWidth - 30) {
      this.isResizing = true;
      this.initialWidth = this.el.nativeElement.offsetWidth;
      this.currentX = event.clientX;
      this.renderer.setStyle(document.body, 'cursor', 'col-resize');
    }
  }

  @HostListener('document:mouseup') onMouseUp() {
    if (this.isResizing) {
      this.isResizing = false;
      this.renderer.setStyle(document.body, 'cursor', 'default');
    }
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      const width = this.initialWidth + (event.clientX - this.currentX);
      this.renderer.setStyle(this.el.nativeElement, 'width', `${width}px`);
    }
  }
}
