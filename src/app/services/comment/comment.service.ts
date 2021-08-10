import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

const API_URL= 'http://localhost:8080'
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  //viet comment moi
  createComment(id:any, commentPostCreate: any) : Observable<any>{
    return this.http.post(API_URL + '/api/comment/create/' + id, commentPostCreate)
  }

  //sua comment
  updateComment(id:any, commentPostCreate: any): Observable<any> {
    return this.http.put(API_URL + '/api/comment/update/' + `${id}`, commentPostCreate)
  }

  //xoa comment
  deleteComment(id: any): Observable<any>{
    return this.http.delete(API_URL + '/api/comment/delete/' + `${id}`)
  }

  // lay list comment theo id bai post
  getListComment(id: any): Observable<any>{
    return this.http.get<any[]>(API_URL + '/api/comment/' +`${id}`)
  }
}
