import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {httpInterceptorProviders} from "./auth.interceptor";
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    EditProfileComponent,
    FriendsComponent,
    ChangepasswordComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],

  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]

})
export class AppModule { }
