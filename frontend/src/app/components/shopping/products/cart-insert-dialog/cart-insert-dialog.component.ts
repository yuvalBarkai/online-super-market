import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductType } from 'src/app/types';


@Component({
  selector: 'app-cart-insert-dialog',
  templateUrl: './cart-insert-dialog.component.html',
  styleUrls: ['./cart-insert-dialog.component.scss']
})
export class CartInsertDialogComponent implements OnInit, OnDestroy {
  constructor(@Inject(MAT_DIALOG_DATA) private data: ProductType,
    private ProductService: ProductsService, private CartService: CartService) { }
  clickedProduct = this.data;
  allProducts: ProductType[] = [];
  subscriptions = new Subscription();
  amount = 1;
  errorMsg = "";

  ngOnInit() {
    this.subscriptions.add(this.ProductService.allProducts$
      .subscribe(allProducts => this.allProducts = allProducts));
  }

  amountChange() {
    if (Math.floor(this.amount) != this.amount)
      this.errorMsg = "The amount needs to be a whole number";
    else if (this.amount < 1)
      this.errorMsg = "The amount needs to be a positive number";
    else
      this.errorMsg = "";
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
