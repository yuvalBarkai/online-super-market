import { Component } from '@angular/core';
import { catchError, ignoreElements, of } from 'rxjs';
import { ApiRequestsService } from 'src/app/services/api-requests.service';
import { UserService } from 'src/app/services/user.service';
import config from "configuration.json";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  constructor(private ApiRequests: ApiRequestsService, private UserService: UserService) { }
  apiErrorMsg = config.apiErrorMsg;

  numberOfOrders$ = this.ApiRequests.public.get.numberOfOrders();
  notification$ = this.UserService.notification$;
}
