import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { City, RegisterPart1Type, RegisterPart2Type } from 'src/app/types';

@Component({
  selector: 'app-register-part2',
  templateUrl: './register-part2.component.html',
  styleUrls: ['./register-part2.component.scss']
})
export class RegisterPart2Component implements OnInit, OnDestroy {
  constructor(private RegistrationService: RegistrationService, private ApiRequests: ApiRequestsService) { }
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
    // register the new user using the server
    console.log(newUser);
  }
}
