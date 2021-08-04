import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserToken} from "../model/user-token";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../model/user";
import {map} from "rxjs/operators";

const URL= 'http://localhost:8080/api/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(<string>localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>(URL + '/signin', {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(data: User): Observable<User> {
    return this.http.post(URL + '/signup', data);
  }

  get currentUserValue(){
    return this.currentUserSubject.value;
    console.log(this.currentUserSubject.value)
  }

  logout() {
    localStorage.removeItem('user')

    this.currentUserSubject.next(null)
    // this.router.navigate(['/login'])
  }
}
