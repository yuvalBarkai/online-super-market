import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import config from "configuration.json";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private UserService: UserService) { }
  ngOnInit(): void {
    const tokenExp = localStorage.getItem(config.localStorageTokenExpiration);
    const token = localStorage.getItem(config.localStorageToken);
    if (tokenExp && token) {
      if (new Date(tokenExp) > new Date())
        this.UserService.login(token);
      else {
        localStorage.removeItem(config.localStorageTokenExpiration);
        localStorage.removeItem(config.localStorageToken);
      }
    }
  }
}
