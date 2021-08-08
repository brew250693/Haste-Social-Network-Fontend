import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendService } from 'src/app/services/friend/friend.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-friend-received',
  templateUrl: './friend-received.component.html',
  styleUrls: ['./friend-received.component.scss']
})
export class FriendReceivedComponent implements OnInit {

  currentUser: any;
  listFriendRequestReceived: any;
  constructor(private friendService: FriendService,
    private userService: UserService,
    private routers: Router) { }

  ngOnInit(): void {
   this.getListFriendRequestReceived();
   this.getUserPrincipal();
  }

  getUserPrincipal(){
    this.userService.getUserPrincipal().subscribe(user =>{
      this.currentUser = user;
    }),
      error => {
        console.log(error);
      }

  }

  getListFriendRequestReceived(): void {
    this.friendService.getFriendRequestReceived()
      .subscribe(
        list => {
          this.listFriendRequestReceived = list;
          console.log(list);
        },
        error => {
          console.log(error);
        });
  }

  Accept(id: any){
    console.log(id)
    this.friendService.acceptFriend(id)
    .subscribe(
      response => {
        alert("xac nhan thanh cong")
        location.reload()
        console.log(response);

      },
      error => {
        console.log(error);
      });
  }

  Cancel(id: any){
    console.log(id)
    this.friendService.cancelFriend(id)
    .subscribe(
      response => {
        alert("huy xac nhan thanh cong")
        // this.routers.navigate(['/friends'])
        location.reload()
        console.log(response);

      },
      error => {
        console.log(error);
      });
  }

}
