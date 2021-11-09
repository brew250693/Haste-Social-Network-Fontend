import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {CommentService} from "../../../services/comment/comment.service";
import Swal from "sweetalert2";
import {IComment} from "../../../model/Comment";

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  comment : any;
  formComment: any;
  private message: string;
  constructor(
    public dialogNew:MatDialogRef<EditCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data : DialogConfirmModel,
    private form : FormBuilder,
    private commentService: CommentService
  ) {
    this.comment = data.comment;
    // this.comments.text = this.comment.text;
    // console.log(this.comment.text);
  }

  ngOnInit(): void {
    this.formComment = this.form.group({
      textare : [null]
    });
    this.formComment.get('textare').setValue(this.comment.text)
  }

  ngSubmit() {

    this.comment.text = this.formComment.value.textare;
    this.commentService.updateComment(this.comment.id,this.comment).subscribe(
      res =>{
        this.message = "Update Comment Success"
        Swal.fire({
          title:this.message,
          text:"",
          icon:"success",
          confirmButtonColor: "#3bc8e7",
        })
        // const dialogRef = this.dialog.open(DialogFromMenuExampleDialog, {restoreFocus: false});
        this.dialogNew.close();
        // location.reload();

      }
    )
  }
}
export class DialogConfirmModel {
  constructor(public comment: any) {
  }
}
