
import {Timestamp} from 'rxjs';
import {IAppRole} from "./i-app-role";

export class IUserRegister {
  public id?: number;
  public username?: string;
  public password?: string;
  public email?: string;
  public phone?: string;
  public birthday?: any;
  public city?: any;
  public avatar?: string;
  public createdDate?: any;
  public blocked?: boolean;
  public roles?: [IAppRole];


  // constructor(id: number, username: string, password: string, confirmPassword: string, birthday: any, firstName: string, lastName: string, gender: string, phone: string, email: string, address: string, avatar: string, createDate: string, blocked: boolean, roles: any[]) {
  //   this.id = id;
  //   this.username = username;
  //   this.password = password;
  //   this.confirmPassword = confirmPassword;
  //   this.birthday = birthday;
  //   this.firstName = firstName;
  //   this.lastName = lastName;
  //   this.gender = gender;
  //   this.phone = phone;
  //   this.email = email;
  //   this.address = address;
  //   this.avatar = avatar;
  //   this.createDate = createDate;
  //   this.blocked = blocked;
  //   this.roles = [
  //     {
  //       name: 'user'
  //     }
  //   ];
  // }
}
