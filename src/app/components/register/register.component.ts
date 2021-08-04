import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  userForm : FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
   email: new FormControl(),
   phone: new FormControl(),
    birthday: new FormControl(),
    city: new FormControl()
  })

  constructor(private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
  }


  submitted = false;
  register(): void {
    if (this.userForm.value as User){
      this.authenticationService.register(this.userForm.value)
        .subscribe(
          response => {
            alert("Create success")
            this.router.navigate(['/login'])
            // console.log(response);
            console.log(this.userForm.value);
            this.submitted = true;
          },
          error => {
            console.log(error);
          });
    }
  }

}
