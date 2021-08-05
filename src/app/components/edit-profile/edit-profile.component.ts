import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
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
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private routers: Router) { }

  ngOnInit(): void {
    this.getUserPrincipal();

    // this.userForm.controls['phone'].setValue(this.currentUser.phone),
    // this.userForm.controls['birthday'].setValue(this.currentUser.birthday),
    // this.userForm.controls['city'].setValue(this.currentUser.city)
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

  edit(): void {
    this.userService.update( this.userForm.value)
      .subscribe(
        response => {
          alert("Edit success")
          console.log(response);

        },
        error => {
          console.log(error);
        });
  }
}
