import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule, FormGroup} from "@angular/forms";
import {httpInterceptorProviders} from "./services/auth/auth.interceptor";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {FriendsComponent} from "./components/friends/friends.component";
import {ChangepasswordComponent} from "./components/changepassword/changepassword.component";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

import { ProfileComponent } from './components/profile/profile.component';
import { DeletePostComponent } from './components/delete-post/delete-post.component';
import { FriendsRequestsComponent } from './components/friends-requests/friends-requests.component';
import { FriendReceivedComponent } from './components/friend-received/friend-received.component';

import { LogOutComponent } from './components/log-out/log-out.component';
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    EditProfileComponent,
    FriendsComponent,
    ChangepasswordComponent,
    UploadImageComponent,
    UploadFileComponent,
    ProfileComponent,
    DeletePostComponent,
    LogOutComponent,
    LogOutComponent,
    DeletePostComponent,
    FriendsRequestsComponent,
    FriendReceivedComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

    // Material

    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIconModule,

  ],

  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]

})
export class AppModule { }
