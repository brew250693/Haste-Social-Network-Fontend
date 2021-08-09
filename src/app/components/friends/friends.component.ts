import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendRequest } from 'src/app/model/FriendRequestForm';
import { FriendService } from 'src/app/services/friend/friend.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  message:string;
  currentUser: any;
  listFriend: any[];

  listFriendAccept: any[];

  friendRequestForm: FriendRequest = {
    usernametwo:''
  }

  listFriendSuggestion: any[];

  constructor(private friendService: FriendService,
              private userService: UserService,
              private routers: Router) { }

  ngOnInit(): void {
    this.getUserPrincipal();
    this.getListFriendSuggestion();
    this.getListFriendAccept()
    this.getListFriend()
  }

  getListFriend(): void {
    this.friendService.listFriend()
      .subscribe(
        list => {
          this.listFriend = list;
          console.log(this.listFriend)
          // console.log(list[0].usernameTwo.username);
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

  addFriend(usernameTwo: any){
    console.log(usernameTwo)
      this.friendRequestForm.usernametwo = usernameTwo;
      console.log(usernameTwo)
      console.log(this.friendRequestForm)
     this.friendService.addFriend(this.friendRequestForm).subscribe(
        response => {
          this.message = "Add Friend Success"
          Swal.fire({
            title:this.message,
            text:"",
            icon:"success",
            confirmButtonColor: "#3bc8e7",
          })
          location.reload();
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

  // getListFriendRequestSend(){
  //   this.friendService.
  // }

  unFriend(id: any){
    console.log(id)
    this.friendService.unFriend(id)
    .subscribe(
      response => {
        this.message = "Unfriend Success"
        Swal.fire({
          title:this.message,
          text:"",
          icon:"success",
          confirmButtonColor: "#3bc8e7",
        })
        location.reload()
        // this.routers.navigate(['/friends'])
        console.log(response);

      },
      error => {
        console.log(error);
      });

  }
  block(id:any){
      console.log(id)
      this.friendService.blockFriend(id)
      .subscribe(
        response => {
          this.message = "Block Friend Success"
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
