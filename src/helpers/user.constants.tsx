import { User } from "../interfaces/User";
import ErrorResponse from "../interfaces/ErrorResponse";


export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE'
export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE'
export const LOGOUT = 'USERS_LOGOUT'


interface RequestLoginAction {
    type: typeof LOGIN_REQUEST
    username: string;
}

interface SuccessLoginAction {
    type: typeof LOGIN_SUCCESS;
    user: User;
}

interface FailureLoginAction {
    type: typeof LOGIN_FAILURE;
    error: ErrorResponse;
}

interface RequestRegisterAction {
    type: typeof REGISTER_REQUEST
    user: User
}

interface SuccessRegisterAction {
    type: typeof REGISTER_SUCCESS
}

interface FailureRegisterAction{
    type: typeof REGISTER_FAILURE
    error: ErrorResponse
}

interface LogoutAction {
    type: typeof LOGOUT
}

export type UserActionTypes = RequestLoginAction | SuccessLoginAction | FailureLoginAction | RequestRegisterAction | SuccessRegisterAction | FailureRegisterAction | LogoutAction
