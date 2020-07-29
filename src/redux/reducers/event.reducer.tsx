import {EventActions, EventActionsTypes,} from "../../helpers/event.constants";
import Event from "../../interfaces/Event";

export interface EventState {
  lastEvent: Event | null;
  allEvents: Event[];
}

const initialState: EventState = {
  lastEvent: null,
  allEvents: [],
};

export function eventReducer(state = initialState, action: EventActionsTypes): EventState {
  switch (action.type) {
    case EventActions.SAVE_EVENT: {
      return {
        ...state,
        lastEvent: action.event,
      };
    }
    case EventActions.GET_ALL_EVENTS: {
      return {
        ...state,
        allEvents: [...action.events],
      };
    }
    case EventActions.SAVE_ALL_EVENTS: {
      return {
          ...state,
        allEvents: [...action.events]
      }
    }
    default: {
      return state;
    }
  }
}
