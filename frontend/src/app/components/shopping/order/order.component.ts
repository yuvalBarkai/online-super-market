import { Component } from '@angular/core';
import Order from 'src/app/models/Order';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  constructor(private ApiRequests: ApiRequestsService, private User: UserService) { }
  cities$ = this.ApiRequests.public.get.cities();
  orderFields = new Order();
  onSubmit() {
    console.log(this.orderFields);
  }
  autoFillCity() {
    const userInfo = this.User.userInfo;
    if (userInfo?.city_id)
      this.orderFields.city_id = userInfo.city_id
  }
  autoFillStreet() {
    const userInfo = this.User.userInfo;
    if (userInfo?.street_name)
      this.orderFields.street_name = userInfo.street_name
  }
}
