import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AdminFormFields from '../components/shopping/cart-side/AdminFormFields';
import { ProductType } from '../types';
import { ApiRequestsService } from './api-requests.service';

@Injectable()
export class AdminService {
  constructor(private ApiRequests: ApiRequestsService) { }
  private selectedProductSubject = new BehaviorSubject<ProductType | null>(null);
  private isAddingNewProduct = new BehaviorSubject(false);

  get selectedProduct$() {
    return this.selectedProductSubject.asObservable();
  }

  get isAddingNewProduct$() {
    return this.isAddingNewProduct.asObservable();
  }

  addingProductView() {
    this.selectedProductSubject.next(null);
    this.isAddingNewProduct.next(true);
  }

  selectProduct(product: ProductType) {
    this.isAddingNewProduct.next(false);
    if (this.selectedProductSubject.value?.product_id == product.product_id)
      this.selectedProductSubject.next(null);
    else
      this.selectedProductSubject.next(product);
  }

  editProduct(adminFormFields: AdminFormFields) {
    console.log(adminFormFields.product_id);
    if (adminFormFields.product_id)
      this.ApiRequests.admin.put.product(adminFormFields.product_id, adminFormFields.toEditFormData()).subscribe({
        next: res => {
          console.log(res);
          // add a call for all products
        },
        error: err => console.log(err)
      });
  }

  addNewProduct(adminFormFields: AdminFormFields) {
    console.log(adminFormFields);
    this.ApiRequests.admin.post.newProduct(adminFormFields.toAddFormData())
      .subscribe({
        next: res => {
          console.log(res);
          // add a call for all products
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
