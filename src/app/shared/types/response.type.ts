import { User } from "./user.type";

export interface HttpResponse<T> {
  resultcode: number;
  message: string;
  data?: T;
}

export interface LoginData extends User {
  token: string;
}

export interface ListResponseData<T> {
  pageIndex: number;
  totalPage: number;
  list: T[];
}
