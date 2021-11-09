import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostService} from 'src/app/services/post/post.service';
import {UserService} from 'src/app/services/user/user.service';
import {TokenService} from "../../services/token/token.service";
import Swal from "sweetalert2";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";
import {UploadService} from "../../services/upload/upload.service";
import {CommentService} from "../../services/comment/comment.service";
import {UpdatePostComponent} from "../update-post/update-post.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: any = {};
  formavt: any = {};
  formmp3: any = {};
  listCommentByIdPost: any[];

  // Upload
  message: string;
  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadAvatar = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();


  // Post
  postList: any;
  currentUser: any;
  name: String;
  postIdUpdate: any;

  isComment: boolean = false;

  clickIsComment() {
    this.isComment = !this.isComment;
  }


  id: any;
  status: number;
  image: String;
  mp3Url: String;
  // post : Post = {id:"", description: "", image:""};

  postForm: FormGroup = new FormGroup({
    description: new FormControl(),
    image: new FormControl(),
  })

  constructor(private tokenService: TokenService,
              private userService: UserService,
              private postService: PostService,
              private afStorage: AngularFireStorage,
              private uploadService: UploadService,
              private commentService: CommentService,
              private dialog: MatDialog,
  ) {
    this.getUserPrincipal();
  }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.postForm.value.image = this.formavt.image;
    this.postForm.value.mp3Url = this.formmp3.mp3Url
    this.postService.createPost(this.postForm.value).subscribe(upPost => {
      this.message = "Post Success"
      Swal.fire({
        title: this.message,
        text: "",
        icon: "success",
        confirmButtonColor: "#3bc8e7",
      })
      location.reload();
    })
  };


  getUserPrincipal() {
    this.userService.getUserPrincipal().subscribe(user => {
      this.currentUser = user;
      this.name = user.username;
      console.log(this.name);
      this.allPost();
    }),
      error => {
        console.log(error);
      }
  }

  onchangeAvatar(event: any) {
    this.formavt.image = event;
  }

  onchangeMp3(event: any) {
    this.formmp3.mp3url = event;
  }


  allPost() {
    this.postService.getPostByUser(this.name).subscribe(list => {
        this.postList = list.slice().reverse();
      },
      error => {

        this.postList = null;
      })

  }

  getListCommentByIdPost(id: any) {
    this.commentService.getListComment(id).subscribe(list => {
      this.listCommentByIdPost = list;
      console.log(this.listCommentByIdPost);
    })
  }

  submitComment(comment: any) {
    // this.commentService.createComment(comment).subscribe(Response =>{
    // })
  }

  getListCommentPost(postId): void {
    this.postIdUpdate = postId;
    this.allPost();
    console.log('post update', this.postIdUpdate);
  }

  getListComment(num: any) {
    this.allPost();
  }

  deletepost(id) {
    this.postService.deletePost(id).subscribe(
      res => {
        this.allPost();
        this.message = "delete post done";
        Swal.fire({
          title: this.message,
          text: "",
          icon: "success",
          confirmButtonColor: "#3bc8e7",
        })
        location.reload();
      },

      error => {
        this.message = "not permission";
        Swal.fire({
          title: this.message,
          text: "",
          icon: "error",
          confirmButtonColor: "#3bc8e7",
        })
      }
    )
  }
  showDialog(post:any){
    console.log(post);
    const dialogRef = this.dialog.open(UpdatePostComponent, {
      width: '500px',
      height: '500px',
      data: {
        post: post
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {

      }
    });
  }
}



