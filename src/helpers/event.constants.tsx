import Event from "../interfaces/Event"

export const SAVE_EVENT = "SAVE_EVENT";
export const GET_ALL_EVENTS = "GET_ALL_EVENTS";

interface SaveEventAction {
    type: typeof SAVE_EVENT;
    event: Event;
}

export interface GetAllEventsAction {
    type: typeof GET_ALL_EVENTS;
    events: Event[];
}

export type EventActionsTypes = SaveEventAction | GetAllEventsAction;