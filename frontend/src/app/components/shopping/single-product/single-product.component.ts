import { Component, Input, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { ProductType } from 'src/app/types';
import config from "configuration.json";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent {
  constructor(private ApiRequests: ApiRequestsService) { }
  @Input() product: ProductType | null = null;
  apiImagesUrl = config.apiImagesUrl;
}
