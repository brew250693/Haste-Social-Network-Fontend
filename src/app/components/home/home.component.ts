import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {TokenService} from "../../services/token/token.service";
import {Image} from "../../model/Image";
import {UploadService} from "../../services/upload/upload.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  status = 'Please fill in the form to create Song!'
  isCheckUploadAvatar = false;
  isCheckUploadFile = false;
  form: any = {};
  error1: any = {
    message: "noavatar"
  }
  error2: any = {
    message: "nomp3url"
  }
  success: any = {
    message: "yes"
  }
  img: Image;

  constructor(private tokenService: TokenService,
              private uploadService: UploadService) { }
  currentUser: any ;
  currentUserToken: any ;

  ngOnInit(): void {
    this.currentUserToken = {
      id: this.tokenService.getId(),
      username: this.tokenService.getUsername()
    }
  }
  ngSubmit(){
    this.img = new Image(
      this.form.imageUrl
    )
    this.uploadService.createImg(this.img).subscribe(data =>{
      if(JSON.stringify(this.error1)==JSON.stringify(data)){
        this.status = 'The avatar is required! Please select upload avatar'
      }
      if(JSON.stringify(this.error2)==JSON.stringify(data)){
        this.status = 'The file is required! Please select upload file'
      }
      if(JSON.stringify(this.success)==JSON.stringify(data)){
        this.status = 'Create success!'
      }
    }, error => {
      this.status = 'Please login before create Song'
    })
  }
  onChangeAvatar($event){
    this.form.avatarUrl = $event;
    this.isCheckUploadAvatar = true;
  }
  onChangeFile($event){
    this.form.mp3Url = $event;
    this.isCheckUploadFile = true;
  }

}
