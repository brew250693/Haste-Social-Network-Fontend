import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const API_URL= 'http://localhost:8080'
@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient,
               private router: Router) { }



// danh sach ban be
listFriend(): Observable<any[]>{
  return this.http.get<any[]>(API_URL + '/api/friend/list');
}

// gui loi moi ket nban
addFriend(friendRequest: any): Observable<any>{
return this.http.post(API_URL + '/api/friend/addFriend', friendRequest)
}

//dong y ket ban
acceptFriend(id: any): Observable<any>{
  return this.http.post(API_URL + '/api/friend/accept/' + `${id}`, id)
}

// khong chap nhan ket ban
cancelFriend(id: any): Observable<any>{
  return this.http.post(API_URL + '/api/friend/cancel/' + `${id}` , id)
}

cancelRequestSend(id: any): Observable<any>{
  return this.http.post(API_URL + '/api/friend/cancelRequest/' + `${id}` , id)
}

// chan ket ban
blockFriend(id: any): Observable<any>{
  return this.http.post(API_URL + '/api/friend/block/' + `${id}`, id)
}

unFriend(id: any): Observable<any>{
  return this.http.post(API_URL + '/api/friend/unfriend/' + `${id}`, id)
}

//list loi moi ket ban da gui
getFriendAccept(): Observable<any[]>{
  return this.http.get<any[]>(API_URL + '/api/friend/friendrequestsent')
}

//list yeu cau cho xac nhan
getFriendRequestReceived(): Observable<any[]>{
  return this.http.get<any[]>(API_URL + '/api/friend/friendrequestreceived')
}

}
