import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Password} from "../../model/Password";
import {Message} from "../../model/Message";
import {TokenService} from "../../services/token/token.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  changePasswordForm: FormGroup = new FormGroup({});
  get  currentPassword() { return this.changePasswordForm.get('currentPassword')};
  get  newPassword() { return this.changePasswordForm.get('newPassword')};
  get  confirmPassword() { return this.changePasswordForm.get('confirmPassword')};

  message:string;
  requestPassword: Password;
  messageResponse: Message;
  currentUser: any ;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUserPrincipal();
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },{
      validator: this.MustMatch('newPassword', 'confirmPassword')
    });
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

  changePassword() {
    const data = this.changePasswordForm.value;
    console.log( "1 data "+data);
    this.requestPassword = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    };

    console.log("2  da nhan "+this.requestPassword);
    this.userService.changePassword(this.requestPassword).subscribe(mes => {
      console.log("done"+this.requestPassword);
      this.message = "Change Password Success"
      Swal.fire({
        title:this.message,
        text:"",
        icon:"success",
        confirmButtonColor: "#3bc8e7",
      })
      // alert(this.messageResponse.message.message);
    },
      error => {
        console.log(this.requestPassword + "loi");
      }
    );

  }

  ch(e:any){
    if(e.checked){
      this.changePasswordForm.controls['password'].setValidators([Validators.required])
      this.changePasswordForm.controls['password'].updateValueAndValidity()
    }
    else{
      this.changePasswordForm.controls['password'].setValidators(null)
      this.changePasswordForm.controls['password'].updateValueAndValidity()
    }
  }

  submitted:boolean = false;
  get f() { return this.changePasswordForm.controls; };
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

  // backHome() {
  //   this.router.navigate(['home']);
  // }
}
