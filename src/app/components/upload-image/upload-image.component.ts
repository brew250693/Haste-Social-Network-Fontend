import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";
import {Image} from "../../model/Image";
import {UploadService} from "../../services/upload/upload.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  message:string;
  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadAvatar = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  constructor(private afStorage: AngularFireStorage, private uploadService:UploadService) { }


  ngOnInit(): void {
  }
  //Khi upload file qua the input dưới dạng 1 hoặc nhiều file thì tệp đó thông qua sự kiện (change)$event được kích hoạt. Và tất cả file upload sẽ lưu trữ
  //trong $event.target.files
  onFileChaged($event){
    this.selectedFile = $event.target.files[0];
    // this.checkUploadAvatar = true;
    const id = Math.random().toString(36).substring(2) //Tạo ra 1 cái name riêng để hiển thị trên DB của FB
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile).then(snapshot => {
      return snapshot.ref.getDownloadURL(); //Tra ve  1 cai chuoi sieu van ban luu tren FB
    })
      .then(downloadURL => { //cHUYEN Value tu component cha sang con
        this.downloadURL = downloadURL;
        this.giveURLtoCreate.emit(this.downloadURL);
        // this.checkUploadAvatar = false;
        return downloadURL;
      })
      .catch(error=>{
        console.log(`Failed to upload avatar and get link ${error}`);
      })
    console.log(this.downloadURL)
  }

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
