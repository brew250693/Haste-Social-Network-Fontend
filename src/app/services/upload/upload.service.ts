import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Image} from "../../model/Image";
import {Observable} from "rxjs";

const API_URL = `${environment.API_URL}`;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // private API_IMG = environment +'/profile';

  constructor(private http: HttpClient) {
  }

  createImg(img: Image): Observable<Image> {
    return this.http.post<Image>(API_URL + '/profile/addImage', img);
  }

  pageImage(request) {
    const params = request;
    return this.http.get(API_URL + '/profile/image', {params})
  }

  deleteImgById(id: number): Observable<Image> {
    return this.http.delete<Image>(API_URL + '/profile/deleteImage/${id}')
  }
}
