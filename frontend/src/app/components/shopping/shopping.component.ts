import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent {
  isResizing = false;
  isMinimized = false;
  resizing(isResizing:boolean){
    this.isResizing = isResizing;
  }
  minimizing(isMinimized:boolean){
    this.isMinimized = isMinimized;
  }
  showCart(){
    this.isMinimized = false;
  }
  hideCart(){
    this.isMinimized = true;
  }
}
