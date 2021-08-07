import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import {TokenService} from "../../services/token/token.service";
import {UserService} from "../../services/user/user.service";
import Swal from "sweetalert2";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";
import {Image} from "../../model/Image";
import {UploadService} from "../../services/upload/upload.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  formavt: any = {};



  currentUser: any ;
  message:string;

  // Upload
  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadAvatar = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();


  userForm: FormGroup= new FormGroup({
    phone: new FormControl(),
    birthday: new FormControl(),
    city: new FormControl()
  })

  avataForm: FormGroup= new FormGroup({
    image: new FormControl(),
  })

  constructor(private tokenService: TokenService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private routers: Router,
              private afStorage: AngularFireStorage,
              private uploadService:UploadService) { }

  ngOnInit(): void {
    this.getUserPrincipal();
    console.log(this.currentUser.image)

    // this.userForm.controls['phone'].setValue(this.currentUser.phone),
    // this.userForm.controls['birthday'].setValue(this.currentUser.birthday),
    // this.userForm.controls['city'].setValue(this.currentUser.city)
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

  edit(): void {
    this.userService.update( this.userForm.value)
      .subscribe(
        response => {
          this.message = "Edit Success"
          Swal.fire({
            title:this.message,
            text:"",
            icon:"success",
            confirmButtonColor: "#3bc8e7",
          })
          location.reload()

        },
        error => {
          console.log(error);
        });
  }

  onFileChaged($event){
    this.selectedFile = $event.target.files[0];
  }


  onUpLoad(){
    this.checkUploadAvatar = true;
    const id = Math.random().toString(36).substring(2) //Tạo ra 1 cái name riêng để hiển thị trên DB của FB
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL(); //Tra ve  1 cai chuoi sieu van ban luu tren FB
      })
      .then(downloadURL => { //Chuyen Value tu component cha sang con
        this.downloadURL = downloadURL;
        this.giveURLtoCreate.emit(this.downloadURL);
        this.checkUploadAvatar = false;
        let image:Image= new Image(downloadURL);
        this.uploadService.createImg(image).subscribe((succes)=>{
          this.message = "Upload Success"
          Swal.fire({
            title:this.message,
            text:"",
            icon:"success",
            confirmButtonColor: "#3bc8e7",
          })
          location.reload();
        })
        return downloadURL;
      })
      .catch(error=>{
        this.message = "Upload Fail"
        Swal.fire({
          title:this.message,
          text:"",
          icon:"error",
          confirmButtonColor: "#3bc8e7",
        })
      })
  }

  // ngSubmit(){
  //   // this.post.description = this.form.description;
  //   // console.log(this.form.description)
  //   //   this.post.image = this.formavt.image;
  //   this.avataForm.value.image = this.formavt.image;
  //   this.userService.changeAvata(this.avataForm.value).subscribe(upPost =>{
  //     this.message = "Change Success"
  //     Swal.fire({
  //       title:this.message,
  //       text:"",
  //       icon:"success",
  //       confirmButtonColor: "#3bc8e7",
  //     })
  //     location.reload();
  //   })
  // };
  // onchangeAvatar(event : any){
  //   this.formavt.image = event;
  // }



}
