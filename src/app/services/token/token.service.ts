import { Injectable } from '@angular/core';


const tokenKey = "token";
const idKey = "id";
const name = "name";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  getToken() {
    return window.sessionStorage.getItem(tokenKey);
  }
  setToken(token: string) {
    console.log("chay qua set token");
    window.sessionStorage.removeItem(tokenKey);
    window.sessionStorage.setItem(tokenKey, token);
  }
  getId() {
    return window.sessionStorage.getItem(idKey);
  }

  setId(id: string) {
    window.sessionStorage.removeItem(idKey);
    window.sessionStorage.setItem(idKey, id);
  }
  getName() {
    return window.sessionStorage.getItem(name);
  }

  setName(nameCurrent: any) {
    window.sessionStorage.removeItem(name);
    window.sessionStorage.setItem(name, nameCurrent);
  }
}
