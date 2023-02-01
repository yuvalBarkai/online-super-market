import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../types';
import { ApiRequestsService } from './api-requests.service';

@Injectable()
export class ProductsService {
  constructor(private ApiRequests: ApiRequestsService) { }
  private productsSubject = new BehaviorSubject<ProductType[]>([]);

  get products$() {
    return this.productsSubject.asObservable();
  }

  productsByName(product_name: string) {
    this.ApiRequests.medium.getProductsByProductName(product_name).subscribe({
      next: res => {
        console.log(res);
        this.productsSubject.next(res);
      },
      error: err => console.log(err)
    });
  }
}
