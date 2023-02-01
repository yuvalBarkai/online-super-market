import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationService } from '../services/registration.service';

@Injectable({
  providedIn: 'root'
})
export class Part1CheckGuard implements CanActivate {
  constructor(private router: Router, private RegistrationService: RegistrationService) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const p = this.RegistrationService.part1Val;
    if (p.user_email != '' && p.password != '' && p.id_card != '')
      return true;
    else {
      this.router.navigate(['/home', 'register', 'part1']);
      return false;
    }
  }
}

