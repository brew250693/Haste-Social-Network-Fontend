import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


const API_URL = `${environment.API_URL}`;

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
  changePassword(data: any): Observable<any>{
    return this.httpClient.post(API_URL + '/api/user/change/password', data);
  }
  changeAvata(data:any):Observable<any>{
    return this.httpClient.post(API_URL + '/api/user/change/avatar', data);
  }

  getAllUser(): Observable<any[]>{
    return this.httpClient.get<any[]>(API_URL + '/api/user/allUserNoStatus');
  }

  getUSerByID(id:any): Observable<any>{
    return this.httpClient.get<any>(API_URL + '/api/user/viewInfor/' + id)
  }

}
