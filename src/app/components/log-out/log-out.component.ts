import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {
  message:string;
  constructor(private router: Router,
              private logout: LoginService) { }

  ngOnInit(): void {
  }
  logOut(): void {
    this.logout.logout();
    this.router.navigateByUrl('/login').then(() => {
      this.message = "Logout Success"
      Swal.fire({
        title:this.message,
        text:"See you again :')",
        icon:"success",
        confirmButtonColor: "#3bc8e7",
      });
    });
  }
}
