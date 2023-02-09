import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import config from "configuration.json";
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';

enum Showing {
  home,
  shopping,
  order
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private UserService: UserService, private Router: Router,
    private ProductsService: ProductsService, private Location: Location) { }
  title = config.siteTitle;
  guestName = config.guestName;
  userFirstName = this.guestName;
  subscriptions = new Subscription();
  showing = Showing.home;
  productSearchBar = "";
  productSearch() {
    this.ProductsService.productsByName(this.productSearchBar);
  }
  ngOnInit() {
    this.Location.onUrlChange(url => {
      if (url.includes("shopping"))
        this.showing = Showing.shopping;
      else if (url.includes("order"))
        this.showing = Showing.order;
      else
        this.showing = Showing.home;
    });
    this.subscriptions.add(this.UserService.userSubject$.subscribe(userInfo => {
      if (userInfo)
        this.userFirstName = userInfo.first_name;
      else
        this.userFirstName = this.guestName;
    }));
    this.ProductsService.categoryEvent$
      .subscribe(() => this.productSearchBar = "");
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  signout() {
    if (this.userFirstName != this.guestName) {
      this.UserService.logout();
      this.Router.navigate(['/home']);
    }
  }
}
