import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any ;


  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.currentUser = {
      id: this.tokenService.getId(),
      name: this.tokenService.getName()
    }
  }

}
