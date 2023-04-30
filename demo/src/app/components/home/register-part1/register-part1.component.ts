import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import RegisterPart1 from 'src/app/models/RegisterPart1';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { RegistrationService } from 'src/app/services/registration.service';


@Component({
  selector: 'app-register-part1',
  templateUrl: './register-part1.component.html',
  styleUrls: ['./register-part1.component.scss'],
  host:{
    class:'registerPart1'
  }
})
export class RegisterPart1Component implements OnInit {
  constructor(private router: Router, private RegistrationService: RegistrationService,
    private ApiRequests: ApiRequestsService) { }
  part1Fields = new RegisterPart1();
  errorMsg = "";

  ngOnInit() {
    this.part1Fields = { ...this.RegistrationService.part1Val, passwordConfirmation: this.RegistrationService.part1Val.password };
  }
  /**
   * Submits the information to the server to validate it and move the user to part 2
   * of the registeration.
   */
  goToPart2() {
    const { passwordConfirmation, ...part1 } = this.part1Fields;
    if (passwordConfirmation != part1.password)
      this.errorMsg = "The passwords dont match";
    else {
      this.ApiRequests.public.post.validatePart1(part1).subscribe({
        next: res => {
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
