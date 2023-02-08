import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from "rxjs/operators";
import { CartAndOrderType, CartProductType, CategoryType, City, LoginInfoType, ProductType, RegisterPart1Type, RegistrationType, SuccessObjectType } from 'src/app/types';



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
    getNewShoppingCart: () => {
      return this.http.get<SuccessObjectType>(`${this.MEDIUM_URL}/new/shopping-cart`);
    },
    deleteCartProduct: (cartProductId: number) => {
      return this.http.delete(`${this.MEDIUM_URL}/cart-product/${cartProductId}`);
    },
    postCartProduct: (newCartProduct: CartProductType) => {
      return this.http.post<SuccessObjectType>(`${this.MEDIUM_URL}/cart-product`, newCartProduct);
    },
    getAllCategories: () => {
      return this.http.get<CategoryType[]>(`${this.MEDIUM_URL}/product-categories`);
    },
    getProductsByCategoryId: (category_id: number) => {
      return this.http.get<ProductType[]>(`${this.MEDIUM_URL}/products/category-id/${category_id}`);
    },
    getProductsByProductName: (product_name: string) => {
      return this.http.get<ProductType[]>(`${this.MEDIUM_URL}/products/product-name/${product_name}`);
    },
    getCartsAndOrdersByUserId: (user_id: number) => {
      return this.http.get<CartAndOrderType[]>(`${this.MEDIUM_URL}/carts-orders/${user_id}`);
    },
    getCartProductsByCartId: (cart_id: number) => {
      return this.http.get<CartProductType[]>(`${this.MEDIUM_URL}/cart-products/${cart_id}`);
    }
  }

  public = {
    postValidatePart1: (part1: RegisterPart1Type) => {
      return this.http.post<{ valid: boolean }>(`${this.PUBLIC_URL}/register/validate/part1`, part1);
    },
    postRegisterNewUser: (newUser: RegistrationType) => {
      return this.http.post(`${this.PUBLIC_URL}/register`, newUser);
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
