import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/services/friend/friend.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  currentUser: any;
  listFriend: any[]

  listFriendSuggestion: any[];

  constructor(private friendService: FriendService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUserPrincipal();
    this.getListFriendSuggestion();
  }

  getListFriend(): void {
    this.friendService.listFriend()
      .subscribe(
        list => {
          this.listFriend = list;
          console.log(list);
        },
        error => {
          console.log(error);
        });
  }


  getListFriendSuggestion(): void {
    this.userService.getAllUser()
      .subscribe(
        list => {
          this.listFriendSuggestion = list;
          console.log(list);
          console.log(this.listFriendSuggestion)
        },
        error => {
          console.log(error);
        });

  }

  getUserPrincipal(){
    this.userService.getUserPrincipal().subscribe(user =>{
      this.currentUser = user;
    }),
      error => {
        console.log(error);
      }

      // return this.currentUser;
  }

  addFriend(){
    // this.friendService.addFriend()
  }


}
