import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Component, Inject } from '@angular/core';


@Component({
  selector: 'app-order-done-dialog',
  templateUrl: './order-done-dialog.component.html',
  styleUrls: ['./order-done-dialog.component.scss']
})
export class OrderDoneDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: { message: string, success: boolean },
    private User: UserService, private Cart: CartService, private Products: ProductsService) { }
  response = this.data;
}
