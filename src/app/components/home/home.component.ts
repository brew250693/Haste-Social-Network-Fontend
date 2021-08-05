import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  currentUser: any ;

  ngOnInit(): void {
    this.currentUser = {
      id: this.tokenService.getId(),
      // name: this.tokenService.getName()
    }
  }

}
