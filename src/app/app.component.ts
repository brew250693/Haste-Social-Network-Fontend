import { Component } from '@angular/core';
import {TokenService} from "./services/token/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogin = false;

  token: string;
  title = 'Haste-Social-Network-FontEnd';

  constructor(private tokenService: TokenService) {
    this.token = this.tokenService.getToken();
    if(this.token != null) {
      this.isLogin = true;
    }
  }
}
