import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {

currentUser: any ;
post: any;
  constructor(private userService: UserService,
              private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private routers: Router
            ) { }

  ngOnInit(): void {
    this.getUserPrincipal();
    this.getPostById(this.activatedRoute.snapshot.params.id)
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

  getPostById(id: string): void {
    this.postService.getPostById(id)
      .subscribe(
        data => {
          this.post = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deletePost(): void {
    console.log(1111,this.post.id)
    this.postService.deletePost(this.post.id)
      .subscribe(
        response => {
          console.log(112)
          alert("Xóa thành công")
          this.routers.navigate(['/profile'])
          console.log(response);

        },
        error => {
          console.log(error);
        });

  }

  exit(){
    this.routers.navigate(['/profile'])
  }


}
