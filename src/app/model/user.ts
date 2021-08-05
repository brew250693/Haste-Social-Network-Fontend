import {Role} from "./role";

export interface User {
  id?:number;
  username?:String;
  password?:String;
  email?:String;
  phone?:String;
  birthday?:Date;
  city?:String;
  imageUrl?:String;
  roles?: Role[];
}
