import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {FriendsComponent} from "./components/friends/friends.component";
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import {UploadImageComponent} from "./components/upload-image/upload-image.component";
import {DeletePostComponent} from './components/delete-post/delete-post.component'
import {LogOutComponent} from "./components/log-out/log-out.component";
import { FriendsRequestsComponent } from './components/friends-requests/friends-requests.component';
import { FriendReceivedComponent } from './components/friend-received/friend-received.component';
import { ViewInforFriendComponent } from './components/view-infor-friend/view-infor-friend.component';
import { ResultSearchComponent } from './components/result-search/result-search.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'edit-password', component: ChangepasswordComponent},
  { path: 'friends', component: FriendsComponent},
  { path: 'delete-post/:id' ,component: DeletePostComponent},
  { path: 'img', component: UploadImageComponent},
  { path: 'logout', component: LogOutComponent},

  // { path: 'file', component: UploadImageComponent},
  { path: 'delete-post/:id' ,component: DeletePostComponent},
  { path: 'friends-requests' , component:FriendsRequestsComponent},
  { path: 'friends-received', component: FriendReceivedComponent},
  { path: 'profile/friend/:id', component: ViewInforFriendComponent},
  { path: 'search/:username', component:ResultSearchComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
