import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from "rxjs/operators";
import { CartAndOrderType, CartProductType, CategoryType, City, LoginInfoType, ProductType, RegisterPart1Type, RegistrationType, SuccessObjectType } from 'src/app/types';
import config from "configuration.json";


@Injectable()
export class ApiRequestsService {
  constructor(private http: HttpClient) { }

  private BASE_URL = config.apiBaseUrl;
  private ADMIN_URL = this.BASE_URL + "/admin";
  private MEDIUM_URL = this.BASE_URL + "/medium";
  private PUBLIC_URL = this.BASE_URL + "/public";

  admin = {
    post: {
      newProduct: (product: FormData) => this.http.post<SuccessObjectType>(`${this.ADMIN_URL}/product`, product),
    },
    put: {
      product: (pId: number, product: FormData) => this.http.put<SuccessObjectType>(`${this.ADMIN_URL}/product/${pId}`, product),
    }
  }
  medium = {
    get: {
      newShoppingCart: () => this.http.get<SuccessObjectType>(`${this.MEDIUM_URL}/new/shopping-cart`),
      allCategories: () => this.http.get<CategoryType[]>(`${this.MEDIUM_URL}/product-categories`),
      productsByCategoryId: (category_id: number) => this.http.get<ProductType[]>(`${this.MEDIUM_URL}/products/category-id/${category_id}`),
      productsByProductName: (product_name: string) => this.http.get<ProductType[]>(`${this.MEDIUM_URL}/products/product-name/${product_name}`),
      cartsAndOrdersByUserId: (user_id: number) => this.http.get<CartAndOrderType[]>(`${this.MEDIUM_URL}/carts-orders/${user_id}`),
      cartProductsByCartId: (cart_id: number) => this.http.get<CartProductType[]>(`${this.MEDIUM_URL}/cart-products/${cart_id}`),
    },
    post: {
      cartProduct: (newCartProduct: CartProductType) => this.http.post<SuccessObjectType>(`${this.MEDIUM_URL}/cart-product`, newCartProduct),
    },
    delete: {
      cartProductsByCartId: (cart_id: number) => this.http.delete<SuccessObjectType>(`${this.MEDIUM_URL}/cart-products/cart-id/${cart_id}`),
      cartProduct: (cartProductId: number) => this.http.delete<SuccessObjectType>(`${this.MEDIUM_URL}/cart-product/${cartProductId}`),
    },
  }
  public = {
    get: {
      numberOfOrders: () => this.http.get<{ number_of_orders: number }>(`${this.PUBLIC_URL}/orders/amount`)
        .pipe(shareReplay(1)),
      numberOfProducts: () => this.http.get<{ number_of_products: number }>(`${this.PUBLIC_URL}/products/amount`)
        .pipe(shareReplay(1)),
      cities: () => this.http.get<City[]>(`${this.PUBLIC_URL}/cities`),
    },
    post: {
      validatePart1: (part1: RegisterPart1Type) => this.http.post<{ valid: boolean }>(`${this.PUBLIC_URL}/register/validate/part1`, part1),
      registerNewUser: (newUser: RegistrationType) => this.http.post<SuccessObjectType>(`${this.PUBLIC_URL}/register`, newUser),
      userLogin: (loginInfoType: LoginInfoType) => this.http.post<{ token: string }>(`${this.PUBLIC_URL}/login`, loginInfoType),
    },
  }
}
