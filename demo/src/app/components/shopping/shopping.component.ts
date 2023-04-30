import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

enum Showing {
  products,
  order
}
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  constructor(private Location: Location) { }
  isResizing = false;
  isMinimized = false;
  showing: Showing = 0;
  urlEventUnregister = () => { };

  ngOnInit() {
    if (this.Location.path().includes("products"))
      this.showing = Showing.products;
    else
      this.showing = Showing.order;
    this.urlEventUnregister = this.Location.onUrlChange(url => {
      if (url.includes("products"))
        this.showing = Showing.products;
      else
        this.showing = Showing.order;
    });
  }

  ngOnDestroy() {
    this.urlEventUnregister();
  }

  resizing(isResizing: boolean) {
    this.isResizing = isResizing;
  }
  minimizing(isMinimized: boolean) {
    this.isMinimized = isMinimized;
  }
  showCart() {
    this.isMinimized = false;
  }
  hideCart() {
    this.isMinimized = true;
  }
}
