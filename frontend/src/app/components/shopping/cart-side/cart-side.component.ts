import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-side',
  templateUrl: './cart-side.component.html',
  styleUrls: ['./cart-side.component.scss']
})
export class CartSideComponent {
  constructor(private CartService: CartService, private ProductsService: ProductsService) { }
  cart$ = this.CartService.cart$;
  allProducts$ = this.ProductsService.allProducts$;

  deleteCartItem(cartItemId:number | undefined){
    if(cartItemId)
      this.CartService.removeCartItem(cartItemId);
  }
}
