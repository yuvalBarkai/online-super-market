import { Component } from '@angular/core';
import Order from 'src/app/models/Order';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  constructor(private ApiRequests: ApiRequestsService) { }
  cities$ = this.ApiRequests.public.get.cities();
  orderFields = new Order();
  onSubmit() {
    console.log(this.orderFields);
  }
}
