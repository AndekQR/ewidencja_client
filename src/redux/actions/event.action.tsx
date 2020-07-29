import {eventService} from "../../services/event.service";
import {EventActions, EventActionsTypes} from "../../helpers/event.constants";
import {AppThunk} from "../../helpers/store";
import Event from "../../interfaces/Event"

const getAllEvents = (): AppThunk => (dispatch) => {
 eventService.getAllEvents().then((events: Event[]) => {
    dispatch(success(events));
  });

  function success(events: Event[]): EventActionsTypes {
      return {
        type: EventActions.GET_ALL_EVENTS,
        events: events,
      };
  }
};

const saveEvent = (
  event: Event
): AppThunk => (dispatch) => {
  eventService.saveEvent(event).then((event: Event) => {
    dispatch({
      type: EventActions.SAVE_EVENT,
      event: event,
    });
  });
};

const saveAllEvents = (events: Event[]) : AppThunk => (dispatch) => {
    eventService.saveAllEvents(events).then(value => {
        dispatch({
            type: EventActions.SAVE_ALL_EVENTS,
            events: value
        })
    })
}

export const eventActions = {
    getAllEvents,
    saveEvent,
    saveAllEvents
}