import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../types';
import { ApiRequestsService } from './api-requests.service';

@Injectable()
export class ProductsService {
  constructor(private ApiRequests: ApiRequestsService) { }
  private allProductsSubject = new BehaviorSubject<ProductType[]>([]);
  private productsSubject = new BehaviorSubject<ProductType[]>([]);
  private productsErrorMsg = new BehaviorSubject<null | string>(null);

  get allProducts$() {
    return this.allProductsSubject.asObservable();
  }

  get products$() {
    return this.productsSubject.asObservable();
  }

  get productsErrorMsg$() {
    return this.productsErrorMsg.asObservable();
  }

  productsByName(product_name: string) {
    this.productsErrorMsg.next(null);
    if (product_name == "" || product_name == "all") {
      this.allProductsUpdate();
    }
    this.ApiRequests.medium.getProductsByProductName(product_name).subscribe({
      next: res => this.productsSubject.next(res),
      error: err => {
        this.productsSubject.next([]);
        this.productsErrorMsg.next(err.error.message);
      }
    });
  }

  productsByCategory(category_id: number) {
    this.productsErrorMsg.next(null);
    this.ApiRequests.medium.getProductsByCategoryId(category_id).subscribe({
      next: res => this.productsSubject.next(res),
      error: err => {
        this.productsSubject.next([]);
        this.productsErrorMsg.next(err.error.message);
      }
    })
  }

  private allProductsUpdate() {
    this.productsErrorMsg.next(null);
    this.ApiRequests.medium.getProductsByProductName("all").subscribe({
      next: products => {
        this.allProductsSubject.next(products);
        this.productsSubject.next(products);
      },
      error: err => {
        this.productsSubject.next([]);
        this.productsErrorMsg.next(err.error.message);
      }
    });
  }
}
