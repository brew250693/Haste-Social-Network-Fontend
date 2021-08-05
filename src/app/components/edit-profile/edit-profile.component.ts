import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TokenService} from "../../services/token/token.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  currentUser: any ;

  userForm: FormGroup= new FormGroup({
    phone: new FormControl(),
    birthday: new FormControl(),
    city: new FormControl()
  })

  constructor(private tokenService: TokenService,
              private userService: UserService) { }

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

  edit() {
  }
}
