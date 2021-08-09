import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/model/Comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  @Input()
  id : any;

  commentForm: IComment= {
    content:''
  }

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  submitComment(id:any, content:any){
    this.commentForm.content = content;
    console.log(content)
    console.log(this.commentForm)
    this.commentService.createComment(this.id,this.commentForm).subscribe(Response =>{
      console.log('create success')
    })

  }
}
