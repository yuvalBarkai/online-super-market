import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private UserService: UserService, private Router: Router) { }
  /**
   * Checks for the word public in the request's url, if it is found then the requests proceeds,
   * else the userInfo is checked and inside of it the tokenExpiration that is either added to the
   * request or logs out the user, alerts him, and navigates to the home page.
   * It depends if the user is connected and if the token is expired
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> | Observable<never> {
    let clone = request.clone();
    let valid = true;
    if (!request.url.includes("public")) {
      const userInfo = this.UserService.userInfo;
      if (userInfo) {
        const now = new Date();
        if (userInfo.tokenExpiration < now) {
          valid = false;
          alert("Your session has been expired, please login again");
          this.UserService.logout();
          this.Router.navigate(["/home"]);
        }
        else
          clone = request.clone({ headers: request.headers.set("Authorization", `bearer ${userInfo.token}`) });
      }
      else {
        valid = false;
        alert("Please log-in");
        this.Router.navigate(["/home"]);
      }
    }
    if (valid)
      return next.handle(clone);
    else
      return EMPTY;
  }
}
