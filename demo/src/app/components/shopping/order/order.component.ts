import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import Order from 'src/app/models/Order';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { OrderDoneDialogComponent } from './order-done-dialog/order-done-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  constructor(private ApiRequests: ApiRequestsService, private User: UserService,
    private Cart: CartService, private dialogRef: MatDialog, private Router: Router) { }
  cities$ = this.ApiRequests.public.get.cities();
  orderFields = new Order();
  cityClicked = false;

  /*   ngOnInit() {
      this.ApiRequests.medium.get.orderTakenDates()
        .subscribe(res => this.takenDates = res);
    } */
  /**
   *  I had to make double click function because (dblclick) didnt work with angular material
   */
  autoFillCity() {
    if (this.cityClicked) {
      const userInfo = this.User.userInfo;
      if (userInfo?.city_id)
        this.orderFields.city_id = userInfo.city_id
    }
    this.cityClicked = true;
    const timer = setTimeout(() => {
      this.cityClicked = false;
      clearTimeout(timer);
    }, 1000);
  }

  autoFillStreet() {
    const userInfo = this.User.userInfo;
    if (userInfo?.street_name)
      this.orderFields.street_name = userInfo.street_name
  }
  /**
   * Disables the taken dates and the past dates via angular material.
   */
  dateFilter = (d: Date | null) => {
    const now = new Date();
    const date = (d || new Date());
    now.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date >= now;
  }

  @ViewChild('f') f: undefined | NgForm;
  /**
   * Users without a cart are sent back to the shopping page.
   * Requests to place an order from the server, opens a dialog and either
   * shows the error message or shows the success message and allows the user
   * to download a pdf receipt.
   */
  onSubmit() {
    const cart = this.Cart.cartVal;
    if (!cart.cartId || cart.cartProducts.length < 1) //
      this.Router.navigate(['shopping']);
    else if (this.orderFields.arrival_date) {
      this.orderFields.arrival_date = new Date(this.orderFields.arrival_date);
      this.orderFields.cart_id = cart.cartId;
      this.orderFields.order_price = cart.cartTotalPrice;

      let serverResponse = { message: "", success: true };
      this.dialogRef.open(OrderDoneDialogComponent, {
        data: serverResponse
      }).afterClosed().subscribe((isSuccess = serverResponse.success) => {
        if (isSuccess) {
          this.User.loginNotificationCartUpdate();
          this.Router.navigate(["home"]);
          this.Cart.clearCart();
        }
      });
    }
  }
}
