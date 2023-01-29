import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/services/api-requests.service';

import { RegistrationService } from 'src/app/services/registration.service';
import { RegisterPart1Type } from 'src/app/types';

@Component({
  selector: 'app-register-part1',
  templateUrl: './register-part1.component.html',
  styleUrls: ['./register-part1.component.scss']
})
export class RegisterPart1Component implements OnInit {
  constructor(private router: Router, private RegistrationService: RegistrationService,
    private ApiRequests: ApiRequestsService) { }
  part1Fields: RegisterPart1Type = { id_card: "", user_email: "", password: "", passwordConfirmation: "" };
  errorMsg = "";

  ngOnInit() {
    this.part1Fields = { ...this.RegistrationService.part1Val, passwordConfirmation: this.RegistrationService.part1Val.password };
  }

  goToPart2() {
    const { passwordConfirmation, ...part1 } = this.part1Fields;
    if (passwordConfirmation != part1.password)
      this.errorMsg = "The passwords dont match";
    else {
      this.ApiRequests.public.postEmailValidate(this.part1Fields.user_email).subscribe({
        next: res => {
          console.log(res.valid);
          this.router.navigate(['home', 'register', 'part2']);
          this.RegistrationService.updatePart1(this.part1Fields);
        },
        error: err => {
          this.errorMsg = err.error.message;
        }
      });
    }
  }
}
