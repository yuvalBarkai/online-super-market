import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';

/**
 * Protects specifically the shopping/order route in order to not allow
 * users with not items in the cart to go there, also considers a page refresh
 * that will also grant access if the last page was the shopping/order page
 */
@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {
  constructor(private Cart: CartService, private Router: Router) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cartVal = this.Cart.cartVal;
    if (window.location.href.includes("order") || (cartVal.cartId && cartVal.cartProducts.length > 0))
      return true;
    else {
      this.Router.navigate(["shopping", "products"]);
      return false
    }
  }
}
