import { Component, Input } from '@angular/core';
import { ProductType } from 'src/app/types';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent {
  constructor() { }
  @Input() product: ProductType | null = null;
}
