import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  postList: any;
  currentUser: any ;
 
  name : String;

  postForm: FormGroup= new FormGroup({
    description: new FormControl(),
    image: new FormControl(),

  })

  constructor(private tokenService: TokenService,
              private userService: UserService,
              private postService: PostService) {

    this.getUserPrincipal();
   
               }

  ngOnInit(): void {
//  this.getUserPrincipal();
    // this.allPost();

  }


  getUserPrincipal(){
    this.userService.getUserPrincipal().subscribe(user =>{
      this.currentUser = user;
      this.name = user.username;
      console.log(this.name);
   this.allPost();
    }),
      error => {
        console.log(error);
      }

      // return this.currentUser;
  }


  createPost(): void {
    this.postService.createPost( this.postForm.value)
      .subscribe(
        response => {
          alert("Post success")
          console.log(10, this.postForm.value),
          console.log(response);
          location.reload()

        },
        error => {
          console.log(error);
        });
  }

  allPost(){
    // console.log(111111)

console.log(110);
    this.postService.getPostByUser(this.name).subscribe(list =>{
        this.postList = list,
        
        console.log(list, 1111)

      }),
      error => {
        console.log(error);
      }
  }

}
