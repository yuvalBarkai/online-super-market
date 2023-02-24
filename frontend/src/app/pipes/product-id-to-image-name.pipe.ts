import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from '../types';
/**
 * Tranformes a product_id to image_name if it gets propery arguments
 * and the product_id does exist in the products list.
 */
@Pipe({
  name: 'pIdToImgName'
})
export class ProductIdToImageNamePipe implements PipeTransform {
  transform(value: number, products: ProductType[] | null | undefined) {
    let imageName = products?.find(p => p.product_id == value)?.image_name;
    if (!imageName)
      imageName = "notFound";
    return imageName;
  }
}
