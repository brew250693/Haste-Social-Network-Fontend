import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const API_URL= 'http://localhost:8080'
@Injectable({
  providedIn: 'root'
})
export class LikecommentService {

  constructor(private httpClient:HttpClient) { }

  likePost(id : any) : Observable<any>{
    return this.httpClient.post( API_URL +'/api/likecomment/'+`${id}`,"no");
  }
  checkLikePost(id : any) : Observable<any>{
    return this.httpClient.get( API_URL +'/api/likecomment/check/'+`${id}`);
  }
}
