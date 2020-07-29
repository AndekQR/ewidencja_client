import Event from "../interfaces/Event"


export enum EventActions {
    SAVE_EVENT = "SAVE_EVENT",
    GET_ALL_EVENTS = "GET_ALL_EVENTS",
    SAVE_ALL_EVENTS = "SAVE_ALL_EVENTS"
}

interface SaveEventAction {
    type: EventActions.SAVE_EVENT;
    event: Event;
}

export interface GetAllEventsAction {
    type: EventActions.GET_ALL_EVENTS;
    events: Event[];
}

export interface SaveAllEventsAction {
    type: EventActions.SAVE_ALL_EVENTS;
    events: Event[];
}

export type EventActionsTypes = SaveEventAction | GetAllEventsAction | SaveAllEventsAction