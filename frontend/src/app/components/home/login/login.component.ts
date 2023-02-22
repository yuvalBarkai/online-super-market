import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private UserService: UserService, private ApiRequests: ApiRequestsService,
    private CartService: CartService, private Router: Router) { }
  userSubject$ = this.UserService.userInfo$;
  cartSubject$ = this.CartService.cart$;
  loginInfo = { user_email: "", password: "" };
  // submited = false;
  errorMsg = "";
  // email = new FormControl('', [Validators.required, Validators.email]);

  @ViewChild('f') form: undefined | NgForm;

  loginSubmit() {
    this.ApiRequests.public.post.userLogin(this.loginInfo).subscribe({
      next: res => {
        this.UserService.login(res.token);
        this.errorMsg = "";
        this.form?.reset();
        if (this.form?.controls)
          Object.keys(this.form?.controls).forEach(key => {
            this.form?.controls[key].setErrors(null)
          });
      },
      error: err => this.errorMsg = err.error.message,
    });
  }

  shoppingBtn() {
    this.Router.navigate(['/shopping']);
  }
}
