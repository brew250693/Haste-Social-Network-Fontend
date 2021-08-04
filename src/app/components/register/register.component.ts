import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// import {UserService} from '../service/user.service';
import {noWhitespaceValidator} from './noWhitespaceValidator';
import {HttpErrorResponse} from '@angular/common/http';
import {IUserRegister} from "../../model/IUserRegister";
import {RegisterService} from "../../service/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required,noWhitespaceValidator]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    birthday: new FormControl('', [Validators.required]),
    city: new FormControl('',[Validators.required])
  });

  constructor(private registerService: RegisterService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    const user = this.setNewUser();
    this.registerService.register(user).subscribe(() => {
      alert('Sign Up Success!');
      this.registerForm.reset();
      this.router.navigate(['/login']);
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400) {
          alert('Account already exists');
        } else if (err.status === 500) {
          alert('Register error!');
        }
      }
    });
    console.log(user);
  }

  private setNewUser() {
    const user: IUserRegister = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      birthday: this.registerForm.value.birthday,
      city: this.registerForm.value.city,
      createdDate: Date.now()
    };
    return user;
  }
}
