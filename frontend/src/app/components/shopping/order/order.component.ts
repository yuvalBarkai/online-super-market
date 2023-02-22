import { Component, ViewChild } from '@angular/core';
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
  isSubmitted = false;
  arrivalDate = { valid: true, message: "" };
  cityClicked = false;

  autoFillCity() {
    console.log(this.cityClicked);
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

  arrivalDateChange() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (this.orderFields.arrival_date && now > new Date(this.orderFields.arrival_date)) {
      this.arrivalDate.valid = false;
      this.arrivalDate.message = "arrival date must be in the future";
    } else {
      this.arrivalDate.message = "";
      this.arrivalDate.valid = true;
    }
    console.log(this.arrivalDate);
  }

  @ViewChild('f') f: undefined | NgForm;
  onSubmit() {
    this.isSubmitted = true;
    if (!this.Cart.cartVal.cartId)
      this.Router.navigate(['shopping']);
    else if (this.arrivalDate.valid && this.f?.form.valid && this.orderFields.arrival_date) {
      this.orderFields.arrival_date = new Date(this.orderFields.arrival_date);
      this.orderFields.cart_id = this.Cart.cartVal.cartId;
      this.orderFields.order_price = this.Cart.cartVal.cartTotalPrice;
      console.log(this.orderFields);
      let serverResponse = { message: "", success: false };
      this.ApiRequests.medium.post.order(this.orderFields)
        .pipe(finalize(() => {
          this.dialogRef.open(OrderDoneDialogComponent, {
            data: serverResponse
          }).afterClosed().subscribe((isSuccess = serverResponse.success) => {
            if (isSuccess) {
              this.User.loginNotificationCartUpdate();
              this.Router.navigate(["home"]);
            }
            else
              console.log(serverResponse);
          });
        })).subscribe({
          next: (res) => serverResponse.success = true,
          error: (err) => serverResponse.message = err.error.message,
        });
    }
  }
}
