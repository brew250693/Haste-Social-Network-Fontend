import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {

currentUser: any ;
  constructor(private userService: UserService,
            
            ) { }

  ngOnInit(): void {
    this.getUserPrincipal();
  }

  getUserPrincipal(){
    this.userService.getUserPrincipal().subscribe(user =>{
      this.currentUser = user;
      console.log(this.currentUser);
    }),
      error => {
        console.log(error);
      }
  }


}
