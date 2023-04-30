import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/app/models/User';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'loginPage'
  }
})
export class LoginComponent {
  constructor(private UserService: UserService, private ApiRequests: ApiRequestsService,
    private CartService: CartService, private Router: Router) { }
  userSubject$ = this.UserService.userInfo$;
  cartSubject$ = this.CartService.cart$;
  loginInfo = { user_email: "", password: "" };

  @ViewChild('f') f: undefined | NgForm;

  errorMsg = "";
  userSubmit() {
    this.UserService.login(new User(5, 'Guest', 'Guest', 'google@gmail.com', 123456786, 3, 'Soho', 0));
    this.Router.navigate(['/shopping']);
  }

  adminSubmit() {
    this.UserService.login(new User(1, 'Admin', 'Admin', 'admin@gmail.com', 987654321, 1, 'Soho', 1));
    this.Router.navigate(['/shopping']);
  }

  shoppingBtn() {
    this.Router.navigate(['/shopping']);
  }
}
