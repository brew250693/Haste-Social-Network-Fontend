import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

const API_URL= 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient,) { }

  createPost(data: any) : Observable<any>{
    return this.httpClient.post( API_URL +  '/api/post/create', data);
  }

  getAllPost(): Observable<any>{
    return this.httpClient.get<any[]>(API_URL + '/api/post/getAllpost');
  }

  getPostByUser(username: String) : Observable<any>{
    return this.httpClient.get<any[]>(API_URL + '/api/post/getpost/' + `${username}`)
  }

  getPostById(id: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/api/post/getPost/' + `${id}`)
  }

  deletePost(id: any): Observable<any> {
    return this.httpClient.delete(API_URL + 'api/post/remove/' + `${id}`);
  }
  
}
