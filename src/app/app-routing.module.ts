import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";

const routes: Routes = [
  {
    // path: 'post',
    // loadChildren: () => import(
      // './post/post.module'
      // ).then(
        // module => module.PostModule
    // )
  },
  // {
  //   path: 'listFriend/:id',
  //   component: FriendComponent
  // },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  // {
  //   path: 'mutual-friends/:id',
  //   component: MutualFriendComponent
  // },
  // {
  //   path: 'listPendingFriend',
  //   component: HandlefriendComponent
  // },
  // {
  //   path: 'user/:id/edit',
  //   component: UserEditComponent
  // },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // }
  // {
  //   path: 'user/:id/about',
  //   component: UserInfoComponent
  // },
  // {
  //   path: 'user/:id/password',
  //   component: UserPasswordComponent
  // },
  // {
  //   path: 'admin',
  //   component: AdminComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
