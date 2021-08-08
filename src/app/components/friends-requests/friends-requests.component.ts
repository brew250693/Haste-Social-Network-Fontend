import { Component, OnInit } from '@angular/core';
import { FriendRequest } from 'src/app/model/FriendRequestForm';
import { FriendService } from 'src/app/services/friend/friend.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-friends-requests',
  templateUrl: './friends-requests.component.html',
  styleUrls: ['./friends-requests.component.scss']
})
export class FriendsRequestsComponent implements OnInit {

  currentUser: any;
  listFriendAccept: any[];
  listFriendSuggestion: any[];
  friendRequestForm: FriendRequest = {
    usernametwo:''
  }
  constructor(private friendService: FriendService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getListFriendSuggestion()
    this.getListFriendAccept();
    this.getUserPrincipal();
  }

  addFriend(usernameTwo: any){
    console.log(usernameTwo)
      this.friendRequestForm.usernametwo = usernameTwo;
      console.log(usernameTwo)
      console.log(this.friendRequestForm)
     this.friendService.addFriend(this.friendRequestForm).subscribe(
        response => {
          alert("them thanh cong")
          // this.routers.navigate(['/list'])
          console.log(11);

        },
        error => {
          console.log(error);
        });

  }

  getListFriendAccept(): void {
    this.friendService.getFriendAccept()
      .subscribe(
        list => {
          this.listFriendAccept = list;
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

  }

  acceptFriend(id:any){
    console.log(id)
    this.friendService.acceptFriend(id)
    .subscribe(
      response => {
        alert("xac nhan thanh cong")
        // this.routers.navigate(['/friends'])
        console.log(response);

      },
      error => {
        console.log(error);
      });
  }

  cancel(id:any){
    console.log(id)
    this.friendService.cancelFriend(id)
    .subscribe(
      response => {
        alert("huy xac nhan thanh cong")
        // this.routers.navigate(['/friends'])
        console.log(response);

      },
      error => {
        console.log(error);
      });
  }

}
