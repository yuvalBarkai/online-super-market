import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from '../types';

/**
 * Tranformes a product_id to product_name if it gets propery arguments
 * and the product_id does exist in the products list.
 */
@Pipe({
  name: 'pIdToName'
})
export class ProductIdToNamePipe implements PipeTransform {
  transform(value: number, products: ProductType[] | null | undefined) {
    let productName = products?.find(p => p.product_id == value)?.product_name;
    if (!productName)
      productName = "Unknown Product";
    return productName;
  }
}
