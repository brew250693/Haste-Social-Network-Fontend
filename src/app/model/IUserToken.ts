import {IRole} from './IRole';
import {Timestamp} from 'rxjs';
import {IAppRole} from "./i-app-role";


export interface IUserToken {
   id?: number;
   username?: string;
   password?: string;
   email?: string;
   phone?: string;
   birthday?: any;
   city?: any;
   avatar?: string;
   createdDate?: any;
   blocked?: boolean;
   roles?: [IAppRole];
   token?: string;
}
