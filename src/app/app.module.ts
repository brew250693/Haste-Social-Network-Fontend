import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ModalModule} from "ngx-bootstrap/modal";
import {httpInterceptorProviders} from "./services/auth/auth.interceptor";
import {SharedModule} from "primeng/api";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {AccordionModule} from 'primeng/accordion';
import {ToastrModule} from "ngx-toastr";;


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule,
    InputTextareaModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    RippleModule,
    ToastrModule.forRoot(),
    AccordionModule,


  ],

  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]

})
export class AppModule { }
