import { User } from "@/app/shared/types/user.type";
import { AppAction } from "@/core/types/redux.type";
import { AuthActionType } from "./auth.type";

export const saveUserInfo = (user?: User): AppAction => {
  return {
    type: AuthActionType.SAVE_USER,
    payload: { user },
  };
};

export const logout = (): AppAction => {
  return {
    type: AuthActionType.LOGOUT,
  };
};
