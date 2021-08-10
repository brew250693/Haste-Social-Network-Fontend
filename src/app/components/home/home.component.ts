import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../model/User";
import {TokenService} from "../../services/token/token.service";
import {Image} from "../../model/Image";
import {UploadService} from "../../services/upload/upload.service";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {PostService} from "../../services/post/post.service";
import Swal from "sweetalert2";
import {ReversePipe} from "ngx-pipes";
import { CommentService } from 'src/app/services/comment/comment.service';
import {LikepostService} from "../../services/post/likepost.service";
import {LikePostComponent} from "../like-post/like-post.component";
import {UpdatePostComponent} from "../update-post/update-post.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form : any = {};
  formavt: any = {};
  formmp3: any = {};
  listCommentByIdPost:any[]
  username:any

  // Upload
  message:string;
  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadAvatar = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();


  // Post
  postList: any;
  currentUser: any ;
  name : String;
  postIdUpdate: any;

  isComment : boolean = false;
  clickIsComment(){
    this.isComment = !this.isComment;
  }
  checkSearch = false;

  postForm: FormGroup= new FormGroup({
    description: new FormControl(),
    image: new FormControl(),
    mp3url: new FormControl(),
  })

  constructor(private tokenService: TokenService,
              private userService: UserService,
              private postService: PostService,
              private afStorage: AngularFireStorage,
              private uploadService:UploadService,
              private commentService: CommentService,
              private dialog: MatDialog,)
  {
    this.getUserPrincipal();
  }

  ngOnInit(): void {

  }

  ngSubmit(){
    // this.post.description = this.form.description;
    //   this.post.image = this.formavt.image;
    this.postForm.value.image = this.formavt.image;
    this.postForm.value.mp3url = this.formmp3.image
    this.postService.createPost(this.postForm.value).subscribe(upPost =>{
      this.message = "Post Success"
      Swal.fire({
        title:this.message,
        text:"",
        icon:"success",
        confirmButtonColor: "#3bc8e7",
      })
      location.reload();
    })
  };


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
  }

  onchangeAvatar(event : any){
    this.formavt.image = event;
  }

  onFileChaged(event : any){
    this.formmp3.mp3url = event;
  }

  allPost(){
    this.postService.getAllPost().subscribe(list =>{
      this.postList = list.slice().reverse();
      console.log(this.postList)

    },
      error => {
        this.postList = null;
      })

  }

  getListCommentByIdPost(id:any){
    this.commentService.getListComment(id).subscribe(list => {
      this.listCommentByIdPost = list;
      console.log(this.listCommentByIdPost);
    })
  }
  submitComment(comment:any){
      // this.commentService.createComment(comment).subscribe(Response =>{

      // })
  }
  getListCommentPost(postId):void {
    this.postIdUpdate = postId;
    this.allPost();
    console.log('post update', this.postIdUpdate);
  }

  getListComment(event: any) {
    this.allPost();
  }


  deletepost(id) {
    this.postService.deletePost(id).subscribe(
      res => {
        this.allPost();
        this.message = "delete post done";
        Swal.fire({
          title:this.message,
          text:"",
          icon:"success",
          confirmButtonColor: "#3bc8e7",
        })
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

  showDialog(post:any){
    // console.log(post);
    const dialogRef = this.dialog.open(UpdatePostComponent, {
      width: '500px',
      height: '500px',
      data: {
        post: post
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {

      }
    });
  }
  submitSearch(){
    this.checkSearch = true;
  }

  searchUserByName(username:any){
      this.username = username;
      console.log(this.username)
      this.submitSearch()
  }

}
