import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-view-infor-friend',
  templateUrl: './view-infor-friend.component.html',
  styleUrls: ['./view-infor-friend.component.scss']
})
export class ViewInforFriendComponent implements OnInit {

  currentUser: any;
  postListFriend:any;
  postIdUpdate:any
  name: String;
  myFriend:any
  constructor(private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute,) {
      this.getInForFriend(this.route.snapshot.params.id)
     }

  ngOnInit(): void {

    this.getUserPrincipal()
    // this.allPost()
  }

  isComment : boolean = false;
  clickIsComment(){
    this.isComment = !this.isComment;
  }

  getListComment(num: any) {
    this.allPost();
  }

  getListCommentPost(postId):void {
    this.postIdUpdate = postId;
    this.allPost();
    console.log('post update', this.postIdUpdate);
  }
  getUserPrincipal() {
    this.userService.getUserPrincipal().subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser)

    }),
      error => {
        console.log(error);
      }
  }


  allPost() {
    this.postService.getPostByUser(this.name).subscribe(list => {
      this.postListFriend = list.slice().reverse();
      console.log(this.postListFriend, 222)
    } ,
      error => {

        this.postListFriend = null;
      })

  }

  getInForFriend(id:any){
    this.userService.getUSerByID(id).subscribe(friend =>{
      this.myFriend = friend;
      this.name = this.myFriend.username
      console.log(this.name, 121212232)
      // console.log(this.myFriend)
      console.log(friend)
      this.allPost()
    })
  }



}
