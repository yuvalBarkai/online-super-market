import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

enum Showing {
  products,
  order
}

@Component({
  selector: 'app-cart-side',
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
  showing = Showing.products;
  receiptSearchVal: string = "";
  private subscriptions = new Subscription();
  private urlEventUnregister = () => { };
  adminFormFields = new AdminFormFields("", "", "");
  errorMsg = "";
  submitted = false;
  @ViewChild('f') f: undefined | NgForm;

  ngOnInit() {
    if (this.Location.path().includes("products"))
      this.showing = Showing.products;
    else
      this.showing = Showing.order;
    this.urlEventUnregister = this.Location.onUrlChange(url => {
      this.submitted = false;
      if (url.includes("products"))
        this.showing = Showing.products;
      else
        this.showing = Showing.order;
    });
    this.subscriptions.add(this.CartService.receiptSearchWord$
      .subscribe(newVal => this.receiptSearchVal = newVal));
    this.subscriptions.add(this.AdminService.selectedProduct$
      .subscribe(res => {
        this.submitted = false;
        this.selectedProduct = res;
        if (res?.product_name)
          this.adminFormFields = new AdminFormFields(res?.product_name, res?.product_price,
            res?.category_id, true, res.product_id);
      }));
    this.subscriptions.add(this.AdminService.isAddingNewProduct$
      .subscribe(res => {
        this.submitted = false;
        this.isAddingNewProduct = res;
        this.adminFormFields = new AdminFormFields("", "", "");
      }));
  }
  emptyCartProducts(cartId: number) {
    this.CartService.emptyCart(cartId);
  }
  deleteCartItem(cartItemId: number | undefined) {
    if (cartItemId)
      this.CartService.removeCartItem(cartItemId);
  }

  saveImage(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files)
      this.adminFormFields.product_image = files;
  }
  addProductView() {
    this.AdminService.addingProductView();
  }
  editProduct() {
    this.submitted = true;
    if (this.f?.form.valid)
      if (this.adminFormFields.product_id)
        this.ApiRequests.admin.put.product(this.adminFormFields.product_id, this.adminFormFields.toEditFormData())
          .subscribe({
            next: res => {
              this.ProductsService.productsByName("all");
              this.errorMsg = "";
            },
            error: err => this.errorMsg = err.error.message
          });
  }
  addNewProduct() {
    this.submitted = true;
    if (this.f?.form.valid)
      this.ApiRequests.admin.post.newProduct(this.adminFormFields.toAddFormData())
        .subscribe({
          next: res => {
            this.ProductsService.productsByName("all");
            this.errorMsg = "";
          },
          error: err => this.errorMsg = err.error.message
        });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.urlEventUnregister();
  }
}
