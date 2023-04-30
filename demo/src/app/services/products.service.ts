import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../types';
import { ApiRequestsService } from './api-requests.service';
import products from '../data/products';
import AdminFormFields from '../models/AdminFormFields';

/**
 * A service that Manages The products and more businesses regarding it
 */
@Injectable()
export class ProductsService {
  constructor(private ApiRequests: ApiRequestsService) { }

  private allProductsSubject = new BehaviorSubject<ProductType[]>(products); // list of all the products
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
      this.productsSubject.next(this.allProductsSubject.value.filter(p => p.product_name.toLowerCase().includes(product_name)));
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
    this.productsSubject.next(this.allProductsSubject.value.filter(p => p.category_id === category_id));
  }

  addProductLocally(newProduct: AdminFormFields) {
    const productList = [...this.allProductsSubject.value];
    const newP = {
      product_id: productList.length,
      product_name: newProduct.product_name,
      category_id: +newProduct.category_id,
      product_price: +newProduct.product_price,
      image_name: "notFound.png"
    }
    productList.push(newP);
    this.allProductsSubject.next(productList);

    this.allProductsUpdate();
  }

  editProductLocally(newProduct: AdminFormFields) {
    const productList = [...this.allProductsSubject.value];
    const indexToEdit = productList.findIndex(p => p.product_id == newProduct.product_id);
    newProduct.image_name = productList[indexToEdit].image_name;
    newProduct.product_id = productList[indexToEdit].product_id;
    productList[indexToEdit] = newProduct as ProductType;
    this.allProductsSubject.next(productList);

    this.allProductsUpdate();
  }

  /**
   * Requests all of the products from the server, if the request is successful
   * updates both subjects, else updates the showing products subject and updates the error
   * message to say "There aren't any products available at the moment, please come back later"
   */
  private allProductsUpdate() {
    this.productsErrorMsg.next(null);
    this.productsSubject.next(this.allProductsSubject.value);
  }
}
