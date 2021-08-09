import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";



const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  submitComment(comment: Comment, postId: number): Observable<Comment> {
    return this.http.post<Comment>(API_URL + '/api/comment/create/{id}', comment);
  }

}
