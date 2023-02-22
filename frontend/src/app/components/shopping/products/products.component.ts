import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { CartService } from 'src/app/services/cart.service';
import { AdminService } from 'src/app/services/admin.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import { ProductType } from 'src/app/types';
import { CartInsertDialogComponent } from './cart-insert-dialog/cart-insert-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(private ProductsService: ProductsService, private ApiRequests: ApiRequestsService,
    private dialogRef: MatDialog, private CartService: CartService, private UserService: UserService,
    private AdminService: AdminService) { }

  userInfo$ = this.UserService.userInfo$;
  categoriesList$ = this.ApiRequests.medium.get.allCategories();
  productsErrorMsg$ = this.ProductsService.productsErrorMsg$;
  selectedProduct$ = this.AdminService.selectedProduct$; // for the admin
  productsList: ProductType[] = [];
  chosenCategoryId = -1; // -1 = all categories
  subscriptions = new Subscription();


  ngOnInit() {
    this.subscriptions.add(this.ProductsService.products$.subscribe({
      next: products => {
        this.productsList = products;
      }
    }));
    this.subscriptions.add(this.ProductsService.searchEvent$
      .subscribe(() => { this.chosenCategoryId = -1 }));
    this.ProductsService.productsByName("all");
  }

  categoryChange(newCategory: number) {
    if (this.chosenCategoryId == newCategory) {
      this.ProductsService.productsByName("all");
      this.chosenCategoryId = -1;
    }
    else {
      this.ProductsService.productsByCategory(newCategory);
      this.chosenCategoryId = newCategory;
    }
  }

  openDialog(product: ProductType) {
    this.dialogRef.open(CartInsertDialogComponent, {
      data: product
    }).afterClosed().subscribe(new_cart_item => {
      if (new_cart_item) {
        const amount = new_cart_item.amount;
        if (amount > 0 && amount == Math.floor(amount))
          this.CartService.addCartItem(new_cart_item);
        else
          alert('amount needs to be a positive, whole number');
      }
    });
  }

  selectProduct(product: ProductType) {
    this.AdminService.selectProduct(product);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
