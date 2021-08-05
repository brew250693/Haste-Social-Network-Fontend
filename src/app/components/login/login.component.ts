import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token/token.service";
import {LoginService} from "../../services/login/login.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {RegisterComponent} from "../register/register.component";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  get username(){ return this.loginForm.get('username')}
  get password(){ return this.loginForm.get('password')}
  message:string;
  name: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private tokenService: TokenService,
              private modalService: BsModalService,

              ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',[ Validators.required]],
      password: ['',[ Validators.required]]
    });
  }


  login() {
    const data = this.loginForm.value;
    this.loginService.login(data).subscribe(res => {
      this.message = "Login Fail"
      Swal.fire({
        title:this.message,
        text:"Please try agian :'(",
        icon:"error",
        confirmButtonColor: "#3bc8e7",
      })
      if (res.token != undefined) {
        this.tokenService.setToken(res.token);
        this.tokenService.setId(res.id);
        this.tokenService.setUsername(res.username);
        this.router.navigate(['']).then(() => {
          // window.location.reload();
          this.message = "Login Success"
          Swal.fire({
            title:this.message,
            text:"Welcome back",
            icon:"success",
            confirmButtonColor: "#3bc8e7",

          })
        });
        document.querySelector('.modal-backdrop').remove()
        document.body.classList.remove('modal-open')
        document.querySelector('.login_dialog').remove()
      }
    }, error =>{
    });
  }

  transferRegister() {
    // @ts-ignore
    document.querySelector('.modal-backdrop').remove()
    document.body.classList.remove('modal-open')
    // @ts-ignore
    document.querySelector('.login_dialog').remove()
    this.modalService.show(RegisterComponent);
  }
}
