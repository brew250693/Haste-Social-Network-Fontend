import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any ;


  constructor(private tokenService: TokenService,
              private userService: UserService,) { }

  ngOnInit(): void {
    this.getUserPrincipal();
  }


  getUserPrincipal(){
    this.userService.getUserPrincipal().subscribe(user =>{
      this.currentUser = user;
      console.log(this.currentUser);
    }),
      error => {
        console.log(error);
      }
  }

}
