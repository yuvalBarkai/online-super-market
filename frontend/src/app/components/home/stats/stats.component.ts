import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, EMPTY, ignoreElements, Observable, of, Subscription } from 'rxjs';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  constructor(private ApiRequests: ApiRequestsService, private UserService: UserService) { }

  numberOfOrders$ = this.ApiRequests.public.get.numberOfOrders();
  ordersError$ = this.numberOfOrders$.pipe(
    ignoreElements(), catchError((err) => of(err)));
  numberOfProducts$ = this.ApiRequests.public.get.numberOfProducts();
  productsError$ = this.numberOfProducts$.pipe(
    ignoreElements(), catchError((err) => of(err)));

  subscriptions = new Subscription();
  notification$ = this.UserService.notification$;

}
