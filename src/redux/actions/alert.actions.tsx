import { AlertActionsTypes, AlertActions } from "../../helpers/alert.constants";
import { AppThunk } from "../../helpers/store";


const success = (message: string): AppThunk => (dispatch) => {
  dispatch({
    type: AlertActions.SUCCESS,
    message: message,
  });

  setTimeout(() => {
    dispatch(clear());
  }, 5000);
};

function clear(): AlertActionsTypes {
  return {
    type: AlertActions.CLEAR,
  };
}

const error = (message: string): AppThunk => (dispatch) => {
  dispatch({
    type: AlertActions.ERROR,
    messeage: message,
  });

  setTimeout(() => {
    dispatch(clear());
  }, 4000);
};


export const alertActions = {
  success,
  error,
  clear,
};