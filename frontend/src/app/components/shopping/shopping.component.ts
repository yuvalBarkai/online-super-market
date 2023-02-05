import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductType } from 'src/app/types';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  constructor(private ProductsService: ProductsService, private ApiRequests: ApiRequestsService) { }
  productsList: ProductType[] = [];
  categoriesList$ = this.ApiRequests.medium.getAllCategories();
  chosenCategoryId = -1; // -1 = all categories
  subscriptions = new Subscription();
  categoryChange(newCategory: number) {
    if (this.chosenCategoryId == newCategory)
      this.chosenCategoryId = -1;
    else
      this.chosenCategoryId = newCategory;
  }

  ngOnInit() {
    this.subscriptions.add(this.ProductsService.products$.subscribe({
      next: products => {
        this.productsList = products;
        this.chosenCategoryId = -1;
      }
    }));
    this.ProductsService.productsByName("all");
  }
  ngOnDestroy(): void {

  }
}
