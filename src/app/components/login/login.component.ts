import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup = new FormGroup({
   username: new FormControl(),
    password: new FormControl()
  })

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(
      () => {
        alert("dang nhap thanh cong")
        this.router.navigate(['/home'])

      }
    )
  }
}
