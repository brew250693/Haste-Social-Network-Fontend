import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    email: null,
    phone: null,
    birthday: null,
    city: null,

  };


  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
  }

  submitted = false;





  onSubmit(): void {
    // const { username, email, password, phone, birthday, city } = this.form;


    this.authService.register(this.form).subscribe(
      data => {
        alert("Success")
        this.router.navigate(['/login'])
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
