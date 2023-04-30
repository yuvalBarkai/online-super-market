import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import config from "configuration.json";
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';

enum Showing {
  home,
  products,
  order
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private UserService: UserService, private Router: Router,
    private ProductsService: ProductsService, private Location: Location,
    private CartService: CartService) { }
  title = config.siteTitle;
  guestName = config.guestName;
  userFirstName = this.guestName;
  private subscriptions = new Subscription();
  private urlEventUnregister = () => { };
  showing = Showing.home;
  productSearchBar = "";
  receiptSearchWord = "";
  receiptSearch() {
    this.CartService.changeReceiptSearchWord(this.receiptSearchWord.toLowerCase());
  }
  productSearch() {
    this.ProductsService.productsByName(this.productSearchBar);
  }

  /**
   * Checks the url to determine which components are being shown and accordingly changes
   * the showing variables who controles certain UI elements.
   * Also registers to the userInfo's subject to display his name and also to the
   * category Event to clear the search bar accordingly.
   */
  ngOnInit() {
    this.urlEventUnregister = this.Location.onUrlChange(url => {
      if (url.includes("products"))
        this.showing = Showing.products;
      else if (url.includes("order"))
        this.showing = Showing.order;
      else
        this.showing = Showing.home;
    });
    this.subscriptions.add(this.UserService.userInfo$.subscribe(userInfo => {
      if (userInfo)
        this.userFirstName = userInfo.first_name;
      else
        this.userFirstName = this.guestName;
    }));
    this.subscriptions.add(this.ProductsService.categoryEvent$
      .subscribe(() => this.productSearchBar = ""));
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.urlEventUnregister();
  }

  signout() {
    if (this.userFirstName != this.guestName) {
      this.UserService.logout();
      this.Router.navigate(['/home']);
    }
  }
}
