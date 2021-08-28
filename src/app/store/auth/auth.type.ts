import { User } from "@/app/shared/types/user.type";

export interface AuthState {
  user: User | null;
  role: string;
}

export enum AuthActionType {
  SAVE_USER = "auth/saveUser",
  LOGOUT = "auth/logout",
}
