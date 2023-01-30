import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';
import { City, RegisterPart1Type, RegisterPart2Type } from 'src/app/types';

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
  part1: RegisterPart1Type = { id_card: '', user_email: '', password: '' };
  part2: RegisterPart2Type = { city_id: "", street_name: "", first_name: "", last_name: "" };

  ngOnInit() {
    this.part1 = this.RegistrationService.part1Val;
    this.part2 = this.RegistrationService.part2Val;
    this.ApiRequests.public.getCities().subscribe({
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
    this.ApiRequests.public.postRegisterNewUser(newUser).subscribe({
      next: res => {
        this.ApiRequests.public
          .postUserLogin({ user_email: newUser.user_email, password: newUser.password }).subscribe({
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
