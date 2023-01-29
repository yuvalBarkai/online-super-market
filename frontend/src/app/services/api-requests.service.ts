import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from "rxjs/operators";
import { CartAndOrderType, CartProductType, City, LoginInfoType } from 'src/app/types';



@Injectable()
export class ApiRequestsService {
  private BASE_URL = "http://localhost:6500/api";
  private ADMIN_URL = this.BASE_URL + "/admin";
  private MEDIUM_URL = this.BASE_URL + "/medium";
  private PUBLIC_URL = this.BASE_URL + "/public";

  constructor(private http: HttpClient) { }

  admin = {

  }

  medium = {
    getCartsAndOrdersByUserId: (user_id: number) => {
      return this.http.get<CartAndOrderType[]>(`${this.MEDIUM_URL}/carts-orders/${user_id}`);
    },
    getCartProductsByCartId: (cart_id: number) => {
      return this.http.get<CartProductType[]>(`${this.MEDIUM_URL}/cart-products/${cart_id}`);
    }
  }

  public = {
    postEmailValidate: (user_email: string) => {
      return this.http.post<{ valid: boolean }>(`${this.PUBLIC_URL}/register/validate-email`, { user_email });
    },
    getCities: () => {
      return this.http.get<City[]>(`${this.PUBLIC_URL}/cities`);
    },
    postUserLogin: (loginInfoType: LoginInfoType) => {
      return this.http.post<{ token: string }>(`${this.PUBLIC_URL}/login`, loginInfoType);
    },
    getNumberOfOrders: () => {
      return this.http.get<{ number_of_orders: number }>(`${this.PUBLIC_URL}/orders/amount`)
        .pipe(shareReplay(1));
    },
    getNumberOfProducts: () => {
      return this.http.get<{ number_of_products: number }>(`${this.PUBLIC_URL}/products/amount`)
        .pipe(shareReplay(1));
    }
  }
}
