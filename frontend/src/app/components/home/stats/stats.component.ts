import { Component, OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  constructor(private ApiRequests: ApiRequestsService) { }
  // -1 makes them not show up
  amountOfOrders = -1;
  amountOfProducts = -1;
  // "" makes them not shop up
  openCartDate = "";
  lastPurchaseDate = "";
  customerName = "";

  ngOnInit() {
    this.ApiRequests.getNumberOfOrders().subscribe({
      next: res => this.amountOfOrders = res.number_of_orders,
      error: err => console.log(err)
    });
    this.ApiRequests.getNumberOfProducts().subscribe({
      next: res => this.amountOfProducts = res.number_of_products,
      error: err => console.log(err)
    });
  }
}
