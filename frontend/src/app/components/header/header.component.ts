import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private UserService: UserService) { }
  title = "Supper";
  userFirstName = "guest";
  subscriptions = new Subscription();
  ngOnInit() {
    this.subscriptions.add(this.UserService.userSubject$.subscribe(userInfo => {
      if (userInfo)
        this.userFirstName = userInfo.first_name;
      else
        this.userFirstName = "guest"
    }));
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
