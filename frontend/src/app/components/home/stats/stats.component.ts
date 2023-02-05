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
export class StatsComponent implements OnInit, OnDestroy {
  constructor(private ApiRequests: ApiRequestsService, private UserService: UserService,
    private CartService: CartService) { }

  numberOfOrders$ = this.ApiRequests.public.getNumberOfOrders();
  ordersError$ = this.numberOfOrders$.pipe(
    ignoreElements(), catchError((err) => of(err)));
  numberOfProducts$ = this.ApiRequests.public.getNumberOfProducts();
  productsError$ = this.numberOfProducts$.pipe(
    ignoreElements(), catchError((err) => of(err)));

  subscriptions = new Subscription();
  notification$: Observable<never> | Observable<string> = EMPTY;

  ngOnInit() {
    this.subscriptions.add(this.UserService.userSubject$.subscribe(userInfo => {
      if (userInfo)
        this.ApiRequests.medium.getCartsAndOrdersByUserId(userInfo.user_id).subscribe({
          next: carts => {
            this.notification$ = this.CartService.generateLoginNotification(carts);
          },
          error: err => console.log(err)
        });
      else
        this.notification$ = EMPTY;
    }));
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
