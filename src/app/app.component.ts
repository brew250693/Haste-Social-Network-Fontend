import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {UserToken} from "./model/user-token";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: UserToken = {};
  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = authenticationService.currentUserValue;
  }

  ngOnInit(): void {

  }

  logout() {
    this.authenticationService.logout();
  }

}
