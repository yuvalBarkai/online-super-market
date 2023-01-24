import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private UserService: UserService) { }

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
        }
        else
          clone = request.clone({ headers: request.headers.set("Authorization", `bearer ${userInfo.token}`) });
      }
      else {
        valid = false;
        alert("Please log-in");
      }
    }
    console.log(clone);
    if (valid)
      return next.handle(clone);
    else
      return EMPTY;
  }
}