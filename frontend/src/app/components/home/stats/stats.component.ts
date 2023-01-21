import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  // -1 makes them not show up
  orderNumber = 0;
  productNumber = 0;
  // "" makes them not shop up
  openCartDate = new Date().toDateString();
  lastPurchaseDate = new Date().toDateString();
  customerName = "Shaul";
  /* openCartDate = "";
  lastPurchaseDate = "";
  customerName = ""; */
}
