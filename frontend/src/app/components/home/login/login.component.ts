import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private UserService: UserService, private ApiRequests: ApiRequestsService,
    private CartService: CartService, private Router: Router) { }
  userSubject$ = this.UserService.userSubject$;
  cartSubject$ = this.CartService.cart$;
  loginInfo = { user_email: "", password: "" };
  // submited = false;
  errorMsg = "";

  @ViewChild('f') form: undefined | HTMLFormElement;

  loginSubmit() {
    this.ApiRequests.public.postUserLogin(this.loginInfo).subscribe({
      next: res => {
        this.UserService.login(res.token);
        this.errorMsg = "";
        this.form?.reset();
      },
      error: err => this.errorMsg = err.error.message,
    });
  }

  shoppingBtn() {
    this.Router.navigate(['/shopping']);
  }
}
