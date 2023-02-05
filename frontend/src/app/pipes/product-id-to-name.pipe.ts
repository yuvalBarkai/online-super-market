import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from '../types';

@Pipe({
  name: 'pIdToName'
})
export class ProductIdToNamePipe implements PipeTransform {
  transform(value: number, products: ProductType[]) {
    let productName = products.find(p => p.product_id == value)?.product_name;
    if (!productName)
      productName = "Unknown Product";
    return productName;
  }
}
