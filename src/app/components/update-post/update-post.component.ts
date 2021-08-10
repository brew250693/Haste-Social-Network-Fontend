import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {PostService} from "../../services/post/post.service";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  post: any;
  postForm: FormGroup;
  formavt: any = {};
  hidenimage = false;
  message:string;
  constructor(public dialogRef: MatDialogRef<UpdatePostComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogConfirmModel,
              private form: FormBuilder,
              private postService: PostService,
              ) {
    this.post = data.post;
    // console.log( "data "+ data.post);
  }

  ngOnInit(): void {
    this.postForm = this.form.group({
      description: [null],
      image: [null],
    });
    this.postForm.get('description').setValue(this.post.description)
  }

  onchangeAvatar(event : any){
    this.formavt.image = event;
    this.hidenimage = true;
  }

  ngSubmit(){
    this.postForm.value.image = this.formavt.image;
    this.post.description = this.postForm.value.description;
    this.post.image = this.postForm.value.image;
    this.postService.updatePost(this.post, this.post.id).subscribe(upPost =>{

      this.message = "Update Post Success"
      Swal.fire({
        title:this.message,
        text:"",
        icon:"success",
        confirmButtonColor: "#3bc8e7",
      })
      // location.reload();
      this.dialogRef.close();
    })
  };

}

export class DialogConfirmModel {
  constructor(public post: any) {
  }

}
