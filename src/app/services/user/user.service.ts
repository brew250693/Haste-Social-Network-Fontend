import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const API_URL= 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userPrincipal: any;

  constructor(private httpClient: HttpClient,) { }

  getUserPrincipal(): Observable<any> {
    return this.httpClient.get<any[]>(API_URL + '/api/user/getuser');
  }

  update( data: any): Observable<any> {
    return this.httpClient.post( API_URL +  '/api/user/change/infor', data);
  }
}
