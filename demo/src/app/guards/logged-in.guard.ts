import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

/**
 * Protects routes that should only be accessed by a logged in user.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private UserService: UserService, private Router: Router) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.UserService.userInfo)
      return true;
    else {
      this.Router.navigate(['/home', 'login']);
      return false;
    }
  }

}
