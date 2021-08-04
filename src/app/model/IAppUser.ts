import {IAppRole} from './i-app-role';

export interface IAppUser {
  id: number;
  username: string;
  password: string;
  email: string;
  phone: number;
  birthday: Date;
  city: string;
  avatar: string;
  createdDate: Date;
  blocked: boolean;
  appRole: IAppRole;

}
