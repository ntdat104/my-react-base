import { AppAction } from "@/core/types/redux.type";
import { AuthActionType, AuthState } from "./auth.type";
import { Role } from "@/app/shared/types/user.type";

export default function authReducer(
  state = initialState,
  action: AppAction,
): AuthState {
  switch (action.type) {
    case AuthActionType.SAVE_USER: {
      return {
        ...state,
        user: action.payload?.user,
        role: Role.USER,
      };
    }
    case AuthActionType.LOGOUT: {
      return {
        ...state,
        user: null,
        role: Role.GUEST,
      };
    }
    default:
      return state;
  }
}

const initialState: AuthState = {
  user: null,
  role: Role.GUEST,
};
