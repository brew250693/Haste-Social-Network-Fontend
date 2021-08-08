import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {User} from "../../model/User";

const API_URL = `${environment.API_URL}`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuthenticated = false;
  constructor(private httpClient: HttpClient) { }

  login(data: any): Observable<any> {
    return this.httpClient.post<any>(API_URL + '/api/auth/signin', data);
  }

  register(user: User): Observable<any>{
    return this.httpClient.post<any>(API_URL + '/api/auth/signup', user);
  }
  logout(): void {
    localStorage.clear();
    this.isAuthenticated = false;
  }
}
