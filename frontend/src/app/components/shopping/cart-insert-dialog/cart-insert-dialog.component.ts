import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartProductType, ProductType } from 'src/app/types';


@Component({
  selector: 'app-cart-insert-dialog',
  templateUrl: './cart-insert-dialog.component.html',
  styleUrls: ['./cart-insert-dialog.component.scss']
})
export class CartInsertDialogComponent implements OnInit, OnDestroy {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductType,
    private ProductService: ProductsService, private CartService: CartService) { }
  allProducts: ProductType[] = [];
  subscriptions = new Subscription();
  amount = 1;
  ngOnInit() {
    this.subscriptions.add(this.ProductService.allProducts$
      .subscribe(allProducts => this.allProducts = allProducts));
  }

  newCartProduct() {
    return {
      product_id: this.data.product_id,
      amount: this.amount,
      total_price: this.amount * this.data.product_price,
      cart_id: this.CartService.cartVal.cartId,
    };
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
