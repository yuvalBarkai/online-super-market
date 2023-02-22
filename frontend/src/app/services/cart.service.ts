import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { CartAndOrderType, CartProductType, CartSubjectType } from 'src/app/types';
import { ApiRequestsService } from './api-requests.service';

@Injectable()
export class CartService {
  constructor(private ApiRequests: ApiRequestsService) { }
  private cartSubject = new BehaviorSubject<CartSubjectType>({ cartId: null, cartTotalPrice: 0, cartProducts: [] });
  private receiptSearchWord = new BehaviorSubject("");

  get cartVal() {
    return this.cartSubject.value;
  }
  get cart$() {
    return this.cartSubject.asObservable();
  }
  get receiptSearchWord$() {
    return this.receiptSearchWord.asObservable();
  }

  changeReceiptSearchWord(newVal: string) {
    this.receiptSearchWord.next(newVal);
  }

  addCartItem(cartItem: CartProductType) {
    if (!this.cartVal.cartId) {
      this.ApiRequests.medium.get.newShoppingCart().subscribe({
        next: res => {
          this.cartSubject.next({ cartId: res.insertId, cartTotalPrice: 0, cartProducts: [] })
          this.addCartItemLocalAndServer(cartItem, res.insertId);
        },
        error: err => console.log(err)
      });
    }
    else
      this.addCartItemLocalAndServer(cartItem);
  }

  private addCartItemLocalAndServer(cartItem: CartProductType, newCartId?: number) {
    if (newCartId)
      cartItem.cart_id = newCartId;
    this.ApiRequests.medium.post.cartProduct(cartItem).subscribe({
      next: cartProductSuccess => {
        const cart = this.cartVal;
        const newCart = [...cart.cartProducts];
        cartItem.cart_product_id = cartProductSuccess.insertId;
        newCart.push(cartItem);
        this.cartSubject.next({
          cartId: cart.cartId,
          cartTotalPrice: cart.cartTotalPrice + cartItem.total_price,
          cartProducts: newCart
        });
      },
      error: err => alert(err.error.message)
    });
  }

  removeCartItem(cartItemId: number) {
    console.log(cartItemId);
    this.ApiRequests.medium.delete.cartProduct(cartItemId)
      .subscribe({
        next: res => {
          console.log(res);
          const cart = this.cartSubject.value;
          const newCart = [...cart.cartProducts];
          const deletedIndex = newCart.findIndex(p => p.cart_product_id == cartItemId);
          const newTotalPrice = cart.cartTotalPrice - newCart[deletedIndex].total_price;
          newCart.splice(deletedIndex, 1);
          this.cartSubject.next({
            cartId: cart.cartId,
            cartTotalPrice: newTotalPrice,
            cartProducts: newCart
          });
        },
        error: err => console.log(err)
      });
  }

  emptyCart(cart_id: number) {
    this.ApiRequests.medium.delete.cartProductsByCartId(cart_id)
      .subscribe(res => {
        this.cartSubject.next({ cartId: this.cartVal.cartId, cartTotalPrice: 0, cartProducts: [] });
      });
  }

  clearCart() {
    this.cartSubject.next({ cartId: null, cartTotalPrice: 0, cartProducts: [] });
  }

  generateLoginNotification(carts: CartAndOrderType[]) {
    return new Observable<string>(subscribe => {
      this.clearCart();
      if (carts.length < 1)
        subscribe.next("Welcome !, enjoy your first purchase !!");
      else {
        let openCartId = -1;
        let openCartCreationDate = "";
        let lastOrder = new Date(carts[carts.length - 1].order_date);
        let lastOrderPrice = carts[carts.length - 1].order_price;
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
          subscribe.next(`Your last purchase was in ${lastOrder.toLocaleDateString("en-GB")} for ${lastOrderPrice} $`);
        }
        else {
          this.ApiRequests.medium.get.cartProductsByCartId(openCartId).pipe(
            finalize(() => {
              subscribe.next(`You have an open cart from the date ${new Date(openCartCreationDate).toLocaleDateString("en-GB")}, for ${this.cartSubject.value.cartTotalPrice} $`);
            })).subscribe({
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
        }
      }
    })
  }
}
