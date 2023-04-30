import { Component } from '@angular/core';
import config from 'configuration.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  imgUrl = config.apiUrlSiteLogo;
  description = config.siteDescription;
}
