import {AlertActionsTypes, AlertActions} from "../../helpers/alert.constants";

export interface AlertState {
    message: string,
    type: AlertActions
};

const initialState: AlertState = {
    message: '',
    type: AlertActions.CLEAR
};

export function alert(state = initialState, action: AlertActionsTypes): AlertState {
    switch (action.type) {
      case AlertActions.SUCCESS:
        return {
          type: action.type,
          message: action.message,
        };
      case AlertActions.ERROR:
        return {
          type: action.type,
          message: action.message,
        };
      case AlertActions.CLEAR:
        return initialState;
      default:
        return state;
    }
}