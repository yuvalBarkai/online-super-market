import { Component, ViewChild } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests/api-requests.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private UserService: UserService, private apiRequests: ApiRequestsService) { }
  userSubject$ = this.UserService.userSubject$;
  loginInfo = { user_email: "", password: "" };
  // submited = false;
  errorMsg = "";

  @ViewChild('f') form: undefined | HTMLFormElement;

  loginSubmit() {
    this.apiRequests.postUserLogin(this.loginInfo).subscribe({
      next: res => {
        this.UserService.login(res.token);
        this.errorMsg = "";
        this.form?.reset();
      },
      error: err => this.errorMsg = err.error.message,
    });
  }
}
