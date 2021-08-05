import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResgisterUser} from "../../model/ResgisterUser";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login/login.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "../login/login.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  get username() {return this.registerForm.get('username')}
  get password() {return this.registerForm.get('password')}
  get email() {return this.registerForm.get('email')}
  get phone() {return this.registerForm.get('phone')}
  get birthday() {return this.registerForm.get('birthday')}
  get city() {return this.registerForm.get('city')}
  get confirmPassword() {return this.registerForm.get('confirmPassword')}

  message: string;
  newUser: ResgisterUser;
  errorRegis: string;
  error1: string = "Tài khoản đã tồn tại!";
  error2: string = "Email đã được sử dụng!";
  check:boolean =false;
  check1:boolean = false;
  check2:boolean = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      city: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },{
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }
  submitted:boolean = false;
  get f() { return this.registerForm.controls; };
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  ch(e:any){
    if(e.checked){
      this.registerForm.controls['password'].setValidators([Validators.required])
      this.registerForm.controls['password'].updateValueAndValidity()
    }
    else{
      this.registerForm.controls['password'].setValidators(null)
      this.registerForm.controls['password'].updateValueAndValidity()
    }
  }


  register(){
    this.submitted = true;
    // if (this.registerForm.invalid) {
    this.newUser = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      birthday: this.registerForm.value.birthday,
      city: this.registerForm.value.city,
    };
    if(this.confirmPassword.value == this.password.value) {
      this.loginService.register(this.newUser).subscribe(res => {
        this.message = "Register Success"
        Swal.fire({
          title:this.message,
          text:"Welcome to Haste",
          icon:"success",
          confirmButtonColor: "#3bc8e7",
        })
        if (res.message != null) {
        }
      },error => {
        this.message = "Register Fail"
        Swal.fire({
          title:this.message,
          text:"Account already exists",
          icon:"error",
          confirmButtonColor: "#3bc8e7",
        })
        this.check = true;
        this.errorRegis = error.error.message;
        if(this.errorRegis == this.error1){
          this.check1 = true;
        };
        if(this.errorRegis == this.error2){
          this.check2 = true;
        }
      });
    }
  }
}
