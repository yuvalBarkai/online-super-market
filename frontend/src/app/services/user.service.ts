import { Injectable } from "@angular/core";
import jwtDecode from "jwt-decode";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { UserInfoType } from "src/app/types";
import { CartService } from "./cart.service";
import config from "configuration.json";
import { ApiRequestsService } from "./api-requests.service";
import { Router } from "@angular/router";
import { ProductsService } from "./products.service";

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
        error: err => console.log(err)
      });
  }

  logout() {
    this.notificationSubject.next("");
    this.userSubject.next(null);
    this.CartService.clearCart();
    localStorage.removeItem(config.localStorageToken);
    localStorage.removeItem(config.localStorageTokenExpiration);
  }
}
