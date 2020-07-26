import {combineReducers} from "redux";
import {authentication} from "./authentication.reducer";
import {registration} from "./registration.reducer";
import {alert} from "./alert.reducer"
import {eventReducer} from "./event.reducer"

export const rootReducer = combineReducers({
    authentication,
    registration,
    event: eventReducer,
    alert,

});

export type RootState = ReturnType<typeof rootReducer>