import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment/comment.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  id : any;
  message:String;
  @Output()
  numberChange: EventEmitter<any> = new EventEmitter();
  num = 0;
  number = 0;

  @Input()
  postIdUpdate : any;
  listCommentByIdPost:any;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private routers: Router,
    private uploadService:UploadService,
    private commentService: CommentService

  ) { }

  ngOnInit(): void {
    this.getListCommentByIdPost(this.id);
  }

  ngOnChanges(change: SimpleChanges) {
    console.log(change);
    console.log('postID uodate in comment', this.postIdUpdate);
    console.log('curentId post', this.id);
    if (change.postIdUpdate.currentValue) {
      this.postIdUpdate = this.postIdUpdate.split('_')[0];
      console.log('postID uodate in comment', this.postIdUpdate);
      if (this.postIdUpdate == this.id) {
        this.getListCommentByIdPost(this.id);
      }
    }



  }

  getListCommentByIdPost(id:any){
    this.commentService.getListComment(id).subscribe(list => {
      this.listCommentByIdPost = list;
      console.log(this.listCommentByIdPost);
    }, error => {
      this.listCommentByIdPost = null;
    })
  }

  deleteComment(idm:any):void{
    console.log(idm+ "id comment");
    this.commentService.deleteComment(idm).subscribe(
      res => {
        this.numberChange.emit(this.num++);
        this.getListCommentByIdPost(this.id);
        this.message = "delete done";
        Swal.fire({
          title:this.message,
          text:"",
          icon:"success",
          confirmButtonColor: "#3bc8e7",
        })
        // location.reload();
      },
      error => {

        this.message = "not permission";
        Swal.fire({
          title:this.message,
          text:"",
          icon:"error",
          confirmButtonColor: "#3bc8e7",
        })
      }
    )
  }

}
