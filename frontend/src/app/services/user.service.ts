import { Injectable } from "@angular/core";
import jwtDecode from "jwt-decode";
import { BehaviorSubject } from "rxjs";
import { UserInfoType } from "src/app/types";
import { CartService } from "./cart.service";
import config from "configuration.json";
import { ApiRequestsService } from "./api-requests.service";
import { Router } from "@angular/router";
import { ProductsService } from "./products.service";

/**
 * A service that Manages The user's information and more businesses regarding it.
 */
@Injectable()
export class UserService {
  constructor(private CartService: CartService, private ApiRequests: ApiRequestsService,
    private Router: Router, private ProductsService: ProductsService) { }
  private userSubject = new BehaviorSubject<UserInfoType | null>(null);
  private notificationSubject = new BehaviorSubject<string>("");

  get userInfo$() {
    return this.userSubject.asObservable();
  }

  get userInfo() {
    return this.userSubject.getValue();
  }

  get notification$() {
    return this.notificationSubject.asObservable();
  }
  /**
   * Decodes the token, saves the information it contains in this service's userSubject and also
   * token's expiration date. Also saves the token and the expiration in the local storage for
   * auto login next time the user enters the site.
   * If the user is an admin he will be navigated to the shopping area where he will have a special
   * UI for him, If it is a normal user a loginNotification regrading the cart will be generated
   * and possibly an open cart will be retrieved.
   * @param token Authorization token that will be decoded and saved
   */
  login(token: string) {
    const { userInfo, exp } = jwtDecode<{ exp: number, userInfo: UserInfoType }>(token);
    const date = new Date(0);
    date.setSeconds(exp);
    userInfo.tokenExpiration = date;
    userInfo.token = token;
    localStorage.setItem(config.localStorageToken, token);
    localStorage.setItem(config.localStorageTokenExpiration, date.toString());
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
    if (this.userInfo)
      this.ApiRequests.medium.get.cartsAndOrdersByUserId(this.userInfo.user_id).subscribe({
        next: carts => {
          this.CartService.generateLoginNotification(carts)
            .subscribe(res => {
              this.notificationSubject.next(res);
              this.ProductsService.productsByName("all");
            });
        },
        error: err => alert(`${err.error.message} \n ${config.apiErrorMsg}`)
      });
  }
  /**
   * Logs out the users by clearing the notificationSubject, the userSubject,
   * his Cart and also the localStorage autosave backup.
   */
  logout() {
    this.notificationSubject.next("");
    this.userSubject.next(null);
    this.CartService.clearCart();
    localStorage.removeItem(config.localStorageToken);
    localStorage.removeItem(config.localStorageTokenExpiration);
  }
}
