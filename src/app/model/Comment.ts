import {User} from "./User";

export interface IComment {
  id?: number;
  content?: string;
  user?: User;
}
