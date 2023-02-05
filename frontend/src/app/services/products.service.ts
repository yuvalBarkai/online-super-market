import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../types';
import { ApiRequestsService } from './api-requests.service';

@Injectable()
export class ProductsService {
  constructor(private ApiRequests: ApiRequestsService) { }
  private allProductsSubject = new BehaviorSubject<ProductType[]>([]);
  private productsSubject = new BehaviorSubject<ProductType[]>([]);

  get allProducts$() {
    return this.allProductsSubject.asObservable();
  }

  get products$() {
    return this.productsSubject.asObservable();
  }

  productsByName(product_name: string) {
    if (product_name == "" || product_name == "all") {
      this.allProductsUpdate();
    }
    this.ApiRequests.medium.getProductsByProductName(product_name).subscribe({
      next: res => this.productsSubject.next(res),
      error: err => this.productsSubject.next([]),
    });
  }

  private allProductsUpdate() {
    this.ApiRequests.medium.getProductsByProductName("all").subscribe({
      next: products => {
        this.allProductsSubject.next(products);
        this.productsSubject.next(products);
      },
    });
  }
}
