import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from "rxjs/operators";
import { CartAndOrderType, CartProductType, CategoryType, City, LoginInfoType, ProductType, RegistrationType, SuccessObjectType } from 'src/app/types';
import config from "configuration.json";
import RegisterPart1 from '../models/RegisterPart1';
import Order from '../models/Order';

/**
 * Contains all of the Api requests in this project.
 * They are categorized via objects: admin, medium, public
 * and inside of them also via objects: get, post, put, delete
 */
@Injectable()
export class ApiRequestsService {
  constructor(private http: HttpClient) { }

  private BASE_URL = "../assets/mocks";

  admin = {
    post: {
      newProduct: (product: FormData) => this.http.post(`${this.BASE_URL}/products.json`, product),
    },
    put: {
      product: (pId: number, product: FormData) => this.http.put<SuccessObjectType>(`${this.BASE_URL}/product/${pId}`, product),
    }
  }
  medium = {
    get: {
      orderTakenDates: () => this.http.get<{ takenDate: string }[]>(`${this.BASE_URL}/orders/takenDates`),
      newShoppingCart: () => this.http.get<SuccessObjectType>(`${this.BASE_URL}/new/shopping-cart`),
      allCategories: () => this.http.get<CategoryType[]>(`${this.BASE_URL}/product-categories.json`),
      productsByCategoryId: (category_id: number) => this.http.get<ProductType[]>(`${this.BASE_URL}/products/category-id/${category_id}`),
      productsByProductName: () => this.http.get<ProductType[]>(`${this.BASE_URL}/products.json`),
      allProducts: () => this.http.get<ProductType[]>(`${this.BASE_URL}/products.json`),
      cartsAndOrdersByUserId: () => this.http.get<CartAndOrderType[]>(`${this.BASE_URL}/carts-orders`),
      cartProductsByCartId: (cart_id: number) => this.http.get<CartProductType[]>(`${this.BASE_URL}/cart-products/${cart_id}`),
    },
    post: {
      cartProduct: (newCartProduct: CartProductType) => this.http.post<SuccessObjectType>(`${this.BASE_URL}/cart-product`, newCartProduct),
      order: (orderDetails: Order) => this.http.post<SuccessObjectType>(`${this.BASE_URL}/order`, orderDetails),
    },
    delete: {
      cartProductsByCartId: (cart_id: number) => this.http.delete<SuccessObjectType>(`${this.BASE_URL}/cart-products/cart-id/${cart_id}`),
      cartProduct: (cartProductId: number) => this.http.delete<SuccessObjectType>(`${this.BASE_URL}/cart-product/${cartProductId}`),
    },
  }
  public = {
    get: {
      numberOfOrders: () => this.http.get<{ number_of_orders: number }>(`${this.BASE_URL}/orders/amount`)
        .pipe(shareReplay(1)),
      numberOfProducts: () => this.http.get<{ number_of_products: number }>(`${this.BASE_URL}/products/amount`)
        .pipe(shareReplay(1)),
      cities: () => this.http.get<City[]>(`${this.BASE_URL}/cities.json`),
    },
    post: {
      validatePart1: (part1: RegisterPart1) => this.http.post<{ valid: boolean }>(`${this.BASE_URL}/register/validate/part1`, part1),
      registerNewUser: (newUser: RegistrationType) => this.http.post<SuccessObjectType>(`${this.BASE_URL}/register`, newUser),
      userLogin: (loginInfoType: LoginInfoType) => this.http.post<{ token: string }>(`${this.BASE_URL}/login`, loginInfoType),
    },
  }
}
