import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FriendRequest } from 'src/app/model/FriendRequestForm';
import { UserSearch } from 'src/app/model/UserSearch';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss']
})
export class ResultSearchComponent implements OnInit {

  // usernameForm: FormGroup = new FormGroup({
  //   username: new FormControl()
  // })
  currentUser:any;
  @Input()
  username: any
  userResult: FriendRequest = {
    usernametwo: ''
  }


  userSearchList: any[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserPrincipal();
  }

  searchUserByName(){
    console.log(this.username)
    this.userResult.usernametwo = this.username;
    console.log(this.userResult)
    this.userService.searchByName(this.userResult).subscribe(list =>{
      this.userSearchList = list
      console.log(list)
      console.log(this.userSearchList)
    })
  }

  getUserPrincipal() {
    this.userService.getUserPrincipal().subscribe(user => {
      this.currentUser = user;
      this.searchUserByName()
    }),
      error => {
        console.log(error);
      }
  }
}
