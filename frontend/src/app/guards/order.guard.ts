import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';

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
