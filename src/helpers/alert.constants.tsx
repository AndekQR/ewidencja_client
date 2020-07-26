export enum AlertActions {
    SUCCESS = "alert_success",
    ERROR  = "alert_error",
    CLEAR = "alert_clear"
}

interface AlertSuccessAction {
    type: AlertActions.SUCCESS;
    message: string;
}

interface AlertErrorAction {
    type: AlertActions.ERROR;
    message: string;
}

interface AlertClearAction {
    type: AlertActions.CLEAR;
}

export type AlertActionsTypes = AlertSuccessAction | AlertErrorAction | AlertClearAction;