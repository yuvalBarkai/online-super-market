import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProductType, ProductType } from 'src/app/types';

@Component({
  selector: 'app-single-cart-item',
  templateUrl: './single-cart-item.component.html',
  styleUrls: ['./single-cart-item.component.scss']
})
export class SingleCartItemComponent {
  @Input() showing: number | undefined;
  @Input() cartProducts: CartProductType[] | undefined;
  @Input() allProducts: ProductType[] | undefined | null;
  @Input() receiptSearchVal: string | undefined;

  @Output() emptyCart = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  deleteCartItem(cartProductId: number | undefined) {
    this.deleteItem.emit(cartProductId);
  }
}
