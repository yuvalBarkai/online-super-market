import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiRequestsService {
  private BASE_URL = "http://localhost:6500";
  constructor(private http: HttpClient) { }

  getNumberOfOrders() {
    return this.http.get<{ number_of_orders: number }>(`${this.BASE_URL}/public/orders/amount`);
  }
  getNumberOfProducts() {
    return this.http.get<{ number_of_products: number }>(`${this.BASE_URL}/public/products/amount`);
  }
}
