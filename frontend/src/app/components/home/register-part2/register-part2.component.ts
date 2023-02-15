import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import RegisterPart1 from 'src/app/models/RegisterPart1';
import RegisterPart2 from 'src/app/models/RegisterPart2';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';
import { City } from 'src/app/types';

@Component({
  selector: 'app-register-part2',
  templateUrl: './register-part2.component.html',
  styleUrls: ['./register-part2.component.scss']
})
export class RegisterPart2Component implements OnInit, OnDestroy {
  constructor(private RegistrationService: RegistrationService,
    private ApiRequests: ApiRequestsService, private Router: Router,
    private UserService: UserService) { }
  cityList: City[] = [];
  part1 = new RegisterPart1()
  part2 = new RegisterPart2()

  ngOnInit() {
    this.part1 = this.RegistrationService.part1Val;
    this.part2 = this.RegistrationService.part2Val;
    this.ApiRequests.public.get.cities().subscribe({
      next: cities => {
        this.cityList = cities;
      },
      error(err) { console.log(err) }
    });
  }

  ngOnDestroy() {
    this.RegistrationService.updatePart2(this.part2);
  }
  submit() {
    const newUser = { ...this.part1, ...this.part2 };
    this.ApiRequests.public.post.registerNewUser(newUser).subscribe({
      next: res => {
        this.ApiRequests.public
          .post.userLogin({ user_email: newUser.user_email, password: newUser.password }).subscribe({
            next: res => {
              this.UserService.login(res.token);
              this.Router.navigate(["/home/login"]);
            },
            error(err) { console.log(err.error.message) },
          });
      },
      error(error) { console.log(error.error.message) }
    });
    console.log(newUser);
  }
}
