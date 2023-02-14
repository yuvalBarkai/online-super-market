import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { CartService } from 'src/app/services/cart.service';
import { AdminService } from 'src/app/services/admin.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { ProductType } from 'src/app/types';
import AdminFormFields from './AdminFormFields';

@Component({
  selector: 'app-cart-side',
  templateUrl: './cart-side.component.html',
  styleUrls: ['./cart-side.component.scss']
})
export class CartSideComponent implements OnInit, OnDestroy {
  constructor(private CartService: CartService, private ProductsService: ProductsService,
    private UserService: UserService, private AdminService: AdminService, private ApiRequests: ApiRequestsService) { }
  cart$ = this.CartService.cart$;
  allProducts$ = this.ProductsService.allProducts$;
  userInfo$ = this.UserService.userInfo$;
  categoriesList$ = this.ApiRequests.medium.get.allCategories();

  selectedProduct: null | ProductType = null;
  isAddingNewProduct = false;
  private subscriptions = new Subscription();

  adminFormFields = new AdminFormFields("", "", "");
  @ViewChild('f') form: undefined | HTMLFormElement;

  ngOnInit() {
    this.subscriptions.add(this.AdminService.selectedProduct$
      .subscribe(res => {
        this.selectedProduct = res;
        if (res?.product_name)
          this.adminFormFields = new AdminFormFields(res?.product_name, res?.product_price,
            res?.category_id, true, res.product_id);
      }));
    this.subscriptions.add(this.AdminService.isAddingNewProduct$
      .subscribe(res => {
        this.isAddingNewProduct = res
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
    this.AdminService.editProduct(this.adminFormFields);
  }
  addNewProduct() {
    this.AdminService.addNewProduct(this.adminFormFields);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
