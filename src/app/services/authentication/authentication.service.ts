import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserToken} from "../../model/user-token";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {map} from "rxjs/operators";

const API_URL= 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;

  constructor(private httpClient: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(<string>localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

    login(data: any): Observable<any> {
    console.log("chay qua tokenservice")
      return this.httpClient.post<any>(API_URL + '/api/auth/signin', data);
    }
  }

  // register(data: User): Observable<User> {
  //   return this.http.post(URL + '/signup', data);
  // }

  // get currentUserValue(){
  //   return this.currentUserSubject.value;
  //   console.log(this.currentUserSubject.value)
  // }

  // logout() {
  //   localStorage.removeItem('user')
  //
  //   this.currentUserSubject.next(null)
    // this.router.navigate(['/login'])
  // }
// }
