import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartAndOrderType, CartProductType, CartSubjectType } from 'src/app/types';
import { ApiRequestsService } from './api-requests.service';

@Injectable()
export class CartService {
  constructor(private apiRequests: ApiRequestsService) { }
  private cartSubject = new BehaviorSubject<CartSubjectType>({ cartId: null, cartTotalPrice: 0, cartProducts: [] });

  get cart$() {
    return this.cartSubject.asObservable();
  }


  addCartItem(cartItem: CartProductType) {
    const cart = this.cartSubject.value;
    const newCart = [...cart.cartProducts];
    newCart.push(cartItem);
    this.cartSubject.next({ cartId: cart.cartId, cartTotalPrice: cart.cartTotalPrice + cartItem.total_price, cartProducts: newCart });
  }

  removeCartItem(cartItemId: number) {
    // this.cartSubject.next({ cartId: null, cartTotalPrice: 0, cartProducts: this.cartSubject.value.cartProducts.filter(p => p.cart_product_id == cartItemId) });
  }

  generateLoginNotification$(carts: CartAndOrderType[]) {
    return new Observable<string>(subscribe => {
      let notification = "";
      if (carts.length < 1)
        notification = "Welcome !, enjoy your first purchase !!";
      else {
        let openCartId = -1;
        let openCartCreationDate = "";
        let lastOrder = new Date(carts[carts.length - 1].order_date); // check that it works
        let lastOrderPrice = carts[carts.length - 1].order_price;
        console.log(carts);
        for (let c of carts) {
          // const orderDate = new Date(c.order_date);
          // if (orderDate > lastOrder) {
          //   lastOrder = orderDate;
          //   lastOrderPrice = c.order_price;
          // }
          if (!c.order_id) {
            openCartId = c.cart_id;
            openCartCreationDate = c.creation_date;
          }
        }
        if (openCartId == -1) {
          notification = `Your last purchase was in ${lastOrder.toLocaleDateString("en-GB")} for ${lastOrderPrice} $`;
        }
        else {
          this.apiRequests.medium.getCartProductsByCartId(openCartId).subscribe({
            next: cart_products => {
              let cartTotalPrice = 0;
              for (let c of cart_products)
                cartTotalPrice += c.total_price;
              this.cartSubject.next({ cartId: openCartId, cartTotalPrice, cartProducts: cart_products });
            },
            error: err => {
              if (err.status == 404)
                this.cartSubject.next({ cartId: openCartId, cartTotalPrice: 0, cartProducts: [] });
              else
                console.log(err.error);
            },
          });
          notification = `You have an open cart from the date ${new Date(openCartCreationDate).toLocaleDateString("en-GB")}, for ${this.cartSubject.value.cartTotalPrice} $`;
        }
      }
      subscribe.next(notification);
    })
  }
}
