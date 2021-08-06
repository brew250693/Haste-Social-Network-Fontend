import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  currentUser: any ;

  signInForm: FormGroup= new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private userService: UserService,) { }

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

  changePassword(): void {
    this.userService.changerPassword( this.signInForm.value)
      .subscribe(
        response => {
          alert("Edit success")
          console.log(response);
          location.reload()

        },
        error => {
          console.log(error);
        });
  }


}
