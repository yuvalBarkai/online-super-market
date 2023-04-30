import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartService } from "./cart.service";
import { ApiRequestsService } from "./api-requests.service";
import { Router } from "@angular/router";
import { ProductsService } from "./products.service";
import User from "../models/User";

/**
 * A service that Manages The user's information and more businesses regarding it.
 */
@Injectable()
export class UserService {
  constructor(private CartService: CartService, private ApiRequests: ApiRequestsService,
    private Router: Router, private ProductsService: ProductsService) { }

  private notificationSubject = new BehaviorSubject<string>("");
  private userSubject = new BehaviorSubject<User | null>(null);

  get userInfo$() {
    return this.userSubject.asObservable();
  }

  get userInfo() {
    return this.userSubject.getValue();
  }

  get notification$() {
    return this.notificationSubject.asObservable();
  }

  login(userInfo: User) {
    this.userSubject.next(userInfo);
    if (userInfo.is_admin)
      this.Router.navigate(['shopping']);
    else
      this.loginNotificationCartUpdate();
  }
  /**
   * If the user is logged in a request for his carts and orders is being sent and if
   * it is successful the cartService handles the information to genereate a
   * login notification in the home page and to possible retrieve an open cart.
   * If the requests fails the user is informated via an alert.
   */
  loginNotificationCartUpdate() {
    this.notificationSubject.next('Enjoy your shopping !');
    this.ProductsService.productsByName("all");
  }
  /**
   * Logs out the users by clearing the notificationSubject, the userSubject,
   * his Cart and also the localStorage autosave backup.
   */
  logout() {
    this.notificationSubject.next("");
    this.userSubject.next(null);
    this.CartService.clearCart();
  }
}
