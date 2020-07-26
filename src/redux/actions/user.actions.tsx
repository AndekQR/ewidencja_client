
import { userService } from "../../services/user.service";
import { User } from "../../interfaces/User";
import { UserActionTypes, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../../helpers/user.constants";
import ErrorResponse from "../../interfaces/ErrorResponse";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { alertActions } from "./alert.actions";


const login = (
  username: string,
  password: string
): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
  dispatch(request(username));

  userService.login(username, password).then(
    (user) => {
      dispatch(success(user));

    },
    (error: any) => {
      dispatch(failure(error));
    }
  );
  function request(username: string): UserActionTypes {
    return { type: LOGIN_REQUEST, username: username };
  }

  function success(user: User): UserActionTypes {
    return { type: LOGIN_SUCCESS, user: user };
  }

  function failure(error: ErrorResponse): UserActionTypes {
    return { type: LOGIN_FAILURE, error: error };
  }
};

export function logout(): UserActionTypes {
  userService.logout();
  return {
    type: LOGOUT,
  };
}

const register = (user: User, password: string): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
    dispatch(request(user));

    userService.register(user, password).then(
      (response) => {
        dispatch(success());
      },
      (error) => {
        dispatch(failure(error));
      }
    );

  function request(user: User): UserActionTypes {
    return { type: REGISTER_REQUEST, user };
  }

  function success(): UserActionTypes {
    return { type: REGISTER_SUCCESS };
  }

  function failure(error: ErrorResponse): UserActionTypes {
    return { type: REGISTER_FAILURE, error };
  }
}


export const userActions = {
  login,
  register,
  logout
};