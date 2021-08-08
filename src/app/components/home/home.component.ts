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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form : any = {};
  formavt: any = {};
  formmp3: any = {};

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


  // id: any;
  // status: number;
  // image: String;
  //
  // post : Post = {id:"", description: "", image:""};

  postForm: FormGroup= new FormGroup({
    description: new FormControl(),
    image: new FormControl(),
    mp3url: new FormControl(),
  })

  constructor(private tokenService: TokenService,
              private userService: UserService,
              private postService: PostService,
              private afStorage: AngularFireStorage,
              private uploadService:UploadService)
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
    this.postService.getPostByUser(this.name).subscribe(list =>{
      this.postList = list.slice().reverse();

    }),
      error => {
        console.log(error);
      }
  }


}
