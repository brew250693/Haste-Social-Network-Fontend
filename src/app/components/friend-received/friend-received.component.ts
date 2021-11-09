import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendService } from 'src/app/services/friend/friend.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-friend-received',
  templateUrl: './friend-received.component.html',
  styleUrls: ['./friend-received.component.scss']
})
export class FriendReceivedComponent implements OnInit {
  message:String;
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
        this.message = "Accept Friend Success"
        Swal.fire({
          title:this.message,
          text:"",
          icon:"success",
          confirmButtonColor: "#3bc8e7",
        })
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
        this.message = "Cancel Friend Success"
        Swal.fire({
          title:this.message,
          text:"",
          icon:"success",
          confirmButtonColor: "#3bc8e7",
        })
        location.reload()
        console.log(response);

      },
      error => {
        console.log(error);
      });
  }

}
