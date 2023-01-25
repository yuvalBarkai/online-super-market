import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/services/api-requests/api-requests.service';
import { City } from 'src/app/types';

@Component({
  selector: 'app-register-part2',
  templateUrl: './register-part2.component.html',
  styleUrls: ['./register-part2.component.scss']
})
export class RegisterPart2Component implements OnInit {
  constructor(private ApiRequests: ApiRequestsService, private Router: Router) { }
  cityList: City[] = [];
  part1 = window.history.state.data; // not secured, swap to a service
  part2 = { city_id: "", street_name: "", first_name: "", last_name: "" };
  ngOnInit() {
    if (!this.part1) {
      this.Router.navigate(['home', 'register', 'part1']);
    }
  }

  submit() {
    const newUser = { ...this.part1, ...this.part2 };
    console.log(newUser);
  }
}
