import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CartProductType, ProductType } from 'src/app/types';
import config from 'configuration.json';
import { Location } from '@angular/common';

@Component({
  selector: 'cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit, OnDestroy {
  constructor(private Location: Location) { }
  @Input() showing: number | undefined;
  @Input() cartProducts: CartProductType[] = [];
  @Input() allProducts: ProductType[] | undefined | null;
  @Input() receiptSearchVal: string | undefined;
  @Input() cartTotalPrice: number | null = 0;

  @Output() emptyCart = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  apiImagesUrl = config.apiImagesUrl;
  displayedColumns = ['image', 'name', 'amount', 'total_price', 'remove'];
  unSubscribe = () => { };

  ngOnInit() {
    console.log(this.cartProducts);
    if (this.showing == 1)
      this.displayedColumns = ['image', 'name', 'amount', 'total_price'];
    this.unSubscribe = this.Location.onUrlChange(() => {
      if (this.showing == 1)
        this.displayedColumns = ['image', 'name', 'amount', 'total_price', 'remove'];
      else
        this.displayedColumns = ['image', 'name', 'amount', 'total_price'];
    })
  }

  ngOnDestroy() {
    this.unSubscribe();
  }

  emptyCartProducts(){
    this.emptyCart.emit();
  }

  deleteCartItem(cartProductId: number | undefined) {
    this.deleteItem.emit(cartProductId);
  }
}
