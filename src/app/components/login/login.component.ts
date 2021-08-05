import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";
import {Userlogin} from "../../model/login";
import {TokenService} from "../../services/token/token.service";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userlogin: Userlogin;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
  }


  login() {
    const data = this.loginForm.value;
    this.userlogin={
      username: data.username,
      password: data.password
    }
    this.authenticationService.login(this.userlogin).subscribe(req => {
        this.tokenService.setToken(req.token);
        this.tokenService.setId(req.id);
        this.tokenService.setName(req.name);
        // this.name = this.tokenService.getName();
        this.router.navigate(['home']);



    }, error =>{
      console.log(error)
    })
  }
}
