import { Component, OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  constructor(private ProductsService: ProductsService, private ApiRequests: ApiRequestsService) { }
  productsList = this.ProductsService.products$;
  categoriesList = this.ApiRequests.medium.getAllCategories();
  ngOnInit() {
    this.ProductsService.productsByName("all");
  }
}
