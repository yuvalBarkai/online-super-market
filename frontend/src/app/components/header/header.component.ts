import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import config from "configuration.json";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private UserService: UserService, private Router: Router) { }
  title = config.siteTitle;
  guestName = config.guestName;
  userFirstName = this.guestName;
  subscriptions = new Subscription();
  ngOnInit() {
    this.subscriptions.add(this.UserService.userSubject$.subscribe(userInfo => {
      if (userInfo)
        this.userFirstName = userInfo.first_name;
      else
        this.userFirstName = this.guestName;
    }));
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
