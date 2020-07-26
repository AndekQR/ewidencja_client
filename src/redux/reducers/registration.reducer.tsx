import {UserActionTypes, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} from "../../helpers/user.constants";

export interface RegisterState {
    registering: boolean
}

const initialState: RegisterState = {
    registering: false
}

export function registration(state = initialState, action: UserActionTypes): RegisterState {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {registering: true};
        case REGISTER_SUCCESS:
            return {registering: false};
        case REGISTER_FAILURE:
            return initialState;
        default:
            return state
    }
}