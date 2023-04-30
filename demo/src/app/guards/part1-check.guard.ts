import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationService } from '../services/registration.service';
/**
 * Protects specifically the route home/register/part2 in order to not allow
 * a user that didnt go though the first part of the registration first.
 */
@Injectable({
  providedIn: 'root'
})
export class Part1CheckGuard implements CanActivate {
  constructor(private router: Router, private RegistrationService: RegistrationService) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const p = this.RegistrationService.part1Val;
    if (p.user_email != '' && p.password != '' && p.id_card != '')
      return true;
    else {
      this.router.navigate(['/home', 'register', 'part1']);
      return false;
    }
  }
}

