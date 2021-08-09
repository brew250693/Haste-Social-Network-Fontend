import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
const API_URL= 'http://localhost:8080'
@Injectable({
  providedIn: 'root'
})
export class LikepostService {
  constructor(private httpClient : HttpClient) { }

  likePost(id : any) : Observable<any>{
    return this.httpClient.post( API_URL +'/api/likepost/'+`${id}`,"no");
  }
  checkLikePost(id : any) : Observable<any>{
    return this.httpClient.get( API_URL +'/api/likepost/check/'+`${id}`);
  }

}
