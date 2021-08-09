import {Component, Input, OnInit} from '@angular/core';
import {TokenService} from "../../services/token/token.service";
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {UploadService} from "../../services/upload/upload.service";
import {LikecommentService} from "../../services/comment/likecomment.service";

@Component({
  selector: 'app-likecomments',
  templateUrl: './likecomments.component.html',
  styleUrls: ['./likecomments.component.scss']
})
export class LikecommentsComponent implements OnInit {

  liked : boolean ;
  @Input()
  id : any;

  likeposts : any;
  checklike(id : any){
    this.likepostService.checkLikePost(id).subscribe(
      res =>{
        this.liked = false;
        this.likeposts = res;
      },
      error => {
        this.liked = true;
        console.log(error.error);
        this.likeposts = error.error;
      }
    )
  }
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private routers: Router,
    private afStorage: AngularFireStorage,
    private uploadService:UploadService,
    private likepostService :LikecommentService
  ) { }

  ngOnInit(): void {
    this.checklike(this.id);
  }

  likeAPost(id: any){
    this.likepostService.likePost(id).subscribe(
      res => {
        this.liked = true;
        console.log(res);
        this.likeposts = res;
        console.log("da like");
      }
    )
  }

  unLikeAPost(id : any){
    this.likepostService.likePost(id).subscribe(
      res => {
        this.likeposts = res;
        this.liked = false;
        console.log("un like");
      }
    )
  }


}
