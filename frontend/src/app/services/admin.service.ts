import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../types';

/**
 * A service for the admin view that allows the UI to change for an update
 * of a product or for an addition of one.
 */
@Injectable()
export class AdminService {
  private selectedPSubject = new BehaviorSubject<ProductType | null>(null);
  private isAddingNewPSubject = new BehaviorSubject(false);

  get selectedProduct$() {
    return this.selectedPSubject.asObservable();
  }

  get isAddingNewProduct$() {
    return this.isAddingNewPSubject.asObservable();
  }
  /**
   * Changes the selectedP Subject to null (unselected), and
   * the isAddingNewP Subject to true
   */
  addingProductView() {
    this.selectedPSubject.next(null);
    this.isAddingNewPSubject.next(true);
  }
  /**
   * Updates the isAddingNewP subject to false, and either
   * Changes the selectPSubject to a product or to null,
   * If the selectProduct is already selected then it goes to null
   * @param product product that is selected
   */
  selectProduct(product: ProductType) {
    this.isAddingNewPSubject.next(false);
    if (this.selectedPSubject.value?.product_id == product.product_id)
      this.selectedPSubject.next(null);
    else
      this.selectedPSubject.next(product);
  }
}
