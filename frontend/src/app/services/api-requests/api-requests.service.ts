import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from "rxjs/operators";
import { LoginInfo } from 'src/app/types';



@Injectable()
export class ApiRequestsService {
  private BASE_URL = "http://localhost:6500/api";
  constructor(private http: HttpClient) { }

  getNumberOfOrders() {
    return this.http.get<{ number_of_orders: number }>(`${this.BASE_URL}/public/orders/amount`)
      .pipe(shareReplay(1));
  }
  getNumberOfProducts() {
    return this.http.get<{ number_of_products: number }>(`${this.BASE_URL}/public/products/amount`)
      .pipe(shareReplay(1));
  }
  postUserLogin(loginInfo: LoginInfo) {
    return this.http.post<{ token: string }>(`${this.BASE_URL}/public/login`, loginInfo);
  }
  test(){
    return this.http.get(`${this.BASE_URL}/medium/test`);
  }
}
