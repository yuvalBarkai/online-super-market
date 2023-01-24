import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, ignoreElements, of, Subscription } from 'rxjs';
import { ApiRequestsService } from 'src/app/services/api-requests/api-requests.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {
  constructor(private ApiRequests: ApiRequestsService, private UserService: UserService) { }

  numberOfOrders$ = this.ApiRequests.getNumberOfOrders();
  ordersError$ = this.numberOfOrders$.pipe(
    ignoreElements(), catchError((err) => of(err)));
  numberOfProducts$ = this.ApiRequests.getNumberOfProducts();
  productsError$ = this.numberOfProducts$.pipe(
    ignoreElements(), catchError((err) => of(err)));

  subscriptions = new Subscription();
  openCartDate = "";
  lastPurchaseDate = "";
  customerName = "";
  // check if he has any carts/orders

  test() {
    this.ApiRequests.test().subscribe((res) => console.log(res));
  }
  ngOnInit() {
    this.subscriptions.add(this.UserService.userSubject$.subscribe(userInfo => {
      if (userInfo) {
        this.customerName = userInfo.first_name;
        
      }
      else {
        this.openCartDate = "";
        this.lastPurchaseDate = "";
        this.customerName = "";
      }
    }));
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  // "" makes them not shop up

}
