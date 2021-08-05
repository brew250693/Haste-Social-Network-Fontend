import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {FriendsComponent} from "./components/friends/friends.component";
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'edit-password', component: ChangepasswordComponent},
  { path: 'friends', component: FriendsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
