import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment/comment.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  id : any;

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
    })
  }

}
