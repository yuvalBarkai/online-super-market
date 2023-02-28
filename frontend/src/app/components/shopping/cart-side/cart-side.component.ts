import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { CartService } from 'src/app/services/cart.service';
import { AdminService } from 'src/app/services/admin.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { ProductType } from 'src/app/types';
import AdminFormFields from '../../../models/AdminFormFields';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import config from 'configuration.json';

@Component({
  selector: 'cart-side',
  templateUrl: './cart-side.component.html',
  styleUrls: ['./cart-side.component.scss']
})
export class CartSideComponent implements OnInit, OnDestroy {
  constructor(private CartService: CartService, private ProductsService: ProductsService,
    private UserService: UserService, private AdminService: AdminService,
    private ApiRequests: ApiRequestsService, private Location: Location) { }

  cart$ = this.CartService.cart$;
  allProducts$ = this.ProductsService.allProducts$;
  userInfo$ = this.UserService.userInfo$;
  categoriesList$ = this.ApiRequests.medium.get.allCategories();
  selectedProduct: null | ProductType = null;
  isAddingNewProduct = false;
  @Input() showing = 0;
  receiptSearchVal: string = "";
  private subscriptions = new Subscription();
  adminFormFields = new AdminFormFields("", "", "");
  errorMsg = "";
  apiImagesUrl = config.apiImagesUrl;

  @ViewChild('f') f: undefined | NgForm;
  /**
   * Checks the current url for certain words to update the component
   * which UI to represent.
   * Subscribes to the receiptSearchWord, selectProduct, and isAddingNewProduct$
   * Observables.
   */
  ngOnInit() {
    this.subscriptions.add(this.CartService.receiptSearchWord$
      .subscribe(newVal => this.receiptSearchVal = newVal));
    this.subscriptions.add(this.AdminService.selectedProduct$
      .subscribe(res => {
        this.errorMsg = "";
        this.selectedProduct = res;
        if (res?.product_name)
          this.adminFormFields = new AdminFormFields(res?.product_name, res?.product_price,
            res?.category_id, true, res.product_id);
      }));
    this.subscriptions.add(this.AdminService.isAddingNewProduct$
      .subscribe(res => {
        this.isAddingNewProduct = res;
        if (res)
          this.f?.resetForm();
      }));
  }
  emptyCartProducts(cartId: number | null) {
    if (cartId)
      this.CartService.emptyCart(cartId);
    else
      this.CartService.emptyCart();
  }
  deleteCartItem(cartItemId: number | undefined) {
    if (cartItemId)
      this.CartService.removeCartItem(cartItemId);
  }

  saveImage(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files)
      this.adminFormFields.product_image = files;
    else
      this.adminFormFields.product_image = undefined;
  }
  addProductView() {
    this.f?.resetForm();
    this.AdminService.addingProductView();
  }
  /**
   * edits a product via the admin's form, validates if the picture was added
   * if the user didn't choose to keep the old one,
   * request's the server to edit a product, if successfull,
   * the products list is updated, the form and the error message are cleared
   */
  editProduct() {
    if (!this.isAddingNewProduct && !this.adminFormFields.keepImage && (!this.adminFormFields.product_image || this.adminFormFields.product_image.length < 1))
      this.errorMsg = "Please upload a product picture or check the keep the same picture";
    else if (this.adminFormFields.product_id && this.f?.valid)
      this.ApiRequests.admin.put.product(this.adminFormFields.product_id, this.adminFormFields.toEditFormData())
        .subscribe({
          next: res => {
            this.ProductsService.productsByName("all");
            this.errorMsg = "";
          },
          error: err => this.errorMsg = err.error.message
        });
  }
  /**
   * Adds a new product via the admin's form,
   * Checks if a picture was chosen, if it was and the form is valid then a
   * request to the server is sent to add a new product, if the request is successfull,
   * the products list is updated, the form and the error message are cleared
   */
  addNewProduct() {
    if (!this.adminFormFields.product_image || this.adminFormFields.product_image.length < 1)
      this.errorMsg = "The product picture is missing";
    else if (this.f?.valid)
      this.ApiRequests.admin.post.newProduct(this.adminFormFields.toAddFormData())
        .subscribe({
          next: res => {
            this.ProductsService.productsByName("all");
            this.errorMsg = "";
            this.f?.resetForm();
          },
          error: err => this.errorMsg = err.error.message
        });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
