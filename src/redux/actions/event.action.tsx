import { eventService } from "../../services/event.service";
import { GET_ALL_EVENTS, SAVE_EVENT, EventActionsTypes } from "../../helpers/event.constants";
import { AppThunk } from "../../helpers/store";
import Event from "../../interfaces/Event"

const getAllEvents = (): AppThunk => (dispatch) => {
 eventService.getAllEvents().then((events: Event[]) => {
    dispatch(success(events));
  });

  function success(events: Event[]): EventActionsTypes {
      return {
        type: GET_ALL_EVENTS,
        events: events,
      };
  }
};



const saveEvent = (
  event: Event
): AppThunk => (dispatch) => {
  eventService.saveEvent(event).then((event: Event) => {
    dispatch({
      type: SAVE_EVENT,
      event: event,
    });
  });
};

export const eventActions = {
    getAllEvents,
    saveEvent
}