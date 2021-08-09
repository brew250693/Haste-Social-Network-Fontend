import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IComment } from 'src/app/model/Comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

listComment:any;

  @Input()
  id : any;
  number = 0;
  @Output() getListCommentPost: EventEmitter<any> = new EventEmitter();

  commentForm: IComment= {
    text:''
  }

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  submitComment(id:any, content:any){
    this.commentForm.text = content;
    console.log(content)
    console.log(this.commentForm)
    this.commentService.createComment(this.id,this.commentForm).subscribe(Response =>{
      console.log('create comment success');
      this.number++;
      this.getListCommentPost.emit( this.id + '_' + this.number);
    })


  }
}
