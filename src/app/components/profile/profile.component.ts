import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';
import {TokenService} from "../../services/token/token.service";
import Swal from "sweetalert2";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";
import {Image} from "../../model/Image";
import {UploadService} from "../../services/upload/upload.service";
import {Post} from "../../model/post";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

form : any = {};
formavt: any = {};

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


  id: any;
  status: number;
  image: String;

  post : Post = {id:"", description: "", image:""};

  postForm: FormGroup= new FormGroup({
    description: new FormControl(),
    image: new FormControl(),
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
//  this.getUserPrincipal();
    // this.allPost();
  }

  ngSubmit(){
    // this.post.description = this.form.description;
    //   this.post.image = this.formavt.image;
      this.postForm.value.image = this.formavt.image;
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

  allPost(){
    this.postService.getPostByUser(this.name).subscribe(list =>{
        this.postList = list;

      }),
      error => {
        console.log(error);
      }
  }

  // onFileChaged($event){
  //   this.selectedFile = $event.target.files[0];
  // }
  //
  //
  // onUpLoad(){
  //   this.checkUploadAvatar = true;
  //   const id = Math.random().toString(36).substring(2) //Tạo ra 1 cái name riêng để hiển thị trên DB của FB
  //   this.ref = this.afStorage.ref(id);
  //   this.ref.put(this.selectedFile)
  //     .then(snapshot => {
  //       return snapshot.ref.getDownloadURL(); //Tra ve  1 cai chuoi sieu van ban luu tren FB
  //     })
  //     .then(downloadURL => { //Chuyen Value tu component cha sang con
  //       this.downloadURL = downloadURL;
  //       this.giveURLtoCreate.emit(this.downloadURL);
  //       this.checkUploadAvatar = false;
  //       let image:Image= new Image(downloadURL);
  //       this.uploadService.createImg(image).subscribe((succes)=>{
  //         this.message = "Upload Success"
  //         Swal.fire({
  //           title:this.message,
  //           text:"",
  //           icon:"success",
  //           confirmButtonColor: "#3bc8e7",
  //         })
  //       })
  //       return downloadURL;
  //     })
  //     .catch(error=>{
  //       this.message = "Upload Fail"
  //       Swal.fire({
  //         title:this.message,
  //         text:"",
  //         icon:"error",
  //         confirmButtonColor: "#3bc8e7",
  //       })
  //     })
  // }

  
}


