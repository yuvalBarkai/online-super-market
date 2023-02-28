import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../types';
import { ApiRequestsService } from './api-requests.service';

/**
 * A service that Manages The products and more businesses regarding it
 */
@Injectable()
export class ProductsService {
  constructor(private ApiRequests: ApiRequestsService) { }

  private allProductsSubject = new BehaviorSubject<ProductType[]>([]); // list of all the products
  private productsSubject = new BehaviorSubject<ProductType[]>([]); // displayed products
  private productsErrorMsg = new BehaviorSubject<null | string>(null); // error message regarding the displayed products
  private categoryEvent = new EventEmitter(); // an event to change the UI dynamiclly
  private searchEvent = new EventEmitter(); // an event to change the UI dynamiclly

  get allProducts$() {
    return this.allProductsSubject.asObservable();
  }

  get products$() {
    return this.productsSubject.asObservable();
  }

  get productsErrorMsg$() {
    return this.productsErrorMsg.asObservable();
  }

  get categoryEvent$() {
    return this.categoryEvent.asObservable();
  }

  get searchEvent$() {
    return this.searchEvent.asObservable();
  }

  productIdToName(product_id: number) {
    return this.allProductsSubject.value.find(p => p.product_id == product_id)?.product_name;
  }
  /**
   * Emits the searchEvent, clears the productsErrorMsg.
   * Checks the argument product_name, if it is an empty string or "all" then the function allProductsUpdate() is called
   * also it will request from the server the products that their name contains the letters that were sent,
   * if successfull the productsSubject is updated, if not the error message is and the products will be cleared.
   * @param product_name product name that will be searched for (can be partial and isn't case sensitive)
   */
  productsByName(product_name: string) {
    product_name = product_name.toLowerCase();
    this.searchEvent.emit();
    this.productsErrorMsg.next(null);
    if (product_name == "" || product_name == "all")
      this.allProductsUpdate();
    else
      this.ApiRequests.medium.get.productsByProductName(product_name).subscribe({
        next: res => this.productsSubject.next(res),
        error: err => {
          this.productsSubject.next([]);
          this.productsErrorMsg.next(err.error.message);
        }
      });
  }
  /**
   * Emits categoryEvent, clears the productsErrorMsg,
   * Requests for products by category, if successfully updates the productsSubject,
   * if not updates the error message subject.
   * @param category_id category id that the products will have
   */
  productsByCategory(category_id: number) {
    this.categoryEvent.emit();
    this.productsErrorMsg.next(null);
    this.ApiRequests.medium.get.productsByCategoryId(category_id).subscribe({
      next: res => this.productsSubject.next(res),
      error: err => {
        this.productsSubject.next([]);
        this.productsErrorMsg.next(err.error.message);
      }
    })
  }
  /**
   * Requests all of the products from the server, if the request is successful
   * updates both subjects, else updates the showing products subject and updates the error
   * message to say "There aren't any products available at the moment, please come back later"
   */
  private allProductsUpdate() {
    this.productsErrorMsg.next(null);
    this.ApiRequests.medium.get.productsByProductName("all").subscribe({
      next: products => {
        this.allProductsSubject.next(products);
        this.productsSubject.next(products);
      },
      error: err => {
        this.productsSubject.next([]);
        this.productsErrorMsg.next("There aren't any products available at the moment, please come back later");
      }
    });
  }
}
