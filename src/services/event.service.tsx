
import {secureAxios} from '../helpers/axiosInstances'
import Event from "../interfaces/Event"

export const eventService = {
  getAllEvents,
  saveEvent,
  updateEvent,
  deleteEvent
};


function getAllEvents() {
  return secureAxios()
    .get("/events/all", {
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("All events error: "+error);
      
    });
}

function saveEvent(event: Event) { 
  return secureAxios()
    .post("/events/new", event)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateEvent(event: Event):Promise<boolean> {
  return secureAxios()
  .put("/events/update", event)
  .then((response) => {
    if (response.status === 200) {
      return true;
    }
    return false;
  })
  .catch(error => {
    console.log(error);
    return false;
  })
}

function deleteEvent(eventId: number): Promise<boolean> {
  return secureAxios()
    .delete("events/delete/" + eventId)
    .then((response) => {
      if(response.status === 200){
        return true;
      }
      return false;
    })
    .catch(() => {
      return false;
    });
}