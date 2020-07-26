import {UserActionTypes, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from "../../helpers/user.constants";
import { User } from "../../interfaces/User";

export interface AuthenticationState {
    loggingIn: boolean,
    loggedIn: boolean,
    user: User | null,
    username: string
};


const initialState: AuthenticationState = {
  loggingIn: false,
  loggedIn: false,
  user: null,
  username: ''
};

export function authentication(state = initialState, action: UserActionTypes): AuthenticationState {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
              loggingIn: true,
              username: action.username
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            }
        case LOGIN_FAILURE:
            return initialState;
        case LOGOUT:
            return initialState;
        default:
            return state
    }
}