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
  notification = "";
  ngOnInit() {
    this.subscriptions.add(this.UserService.userSubject$.subscribe(userInfo => {
      if (userInfo)
        this.ApiRequests.getCartsByUserId(userInfo.user_id).subscribe({ // move all of that to a cart service
          next: carts => {
            if (carts.length < 1)
              this.notification = "Welcome !, enjoy your first purchase !!";
            else {
              let openCart = -1;
              for (let c of carts)
                if (!c.order_id) openCart = c.cart_id;
              if (openCart == -1)
                this.notification = "Your last purchase was in the ?? for ?? $";
              else
                this.notification = "You have an open cart from the date ??, for ?? $";
            }
          },
          error: err => console.log(err)
        });
    }));
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
