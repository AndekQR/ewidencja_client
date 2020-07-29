import XLSX from "xlsx";
import {axiosInstance} from "../helpers/axiosInstances";
import Event from "../interfaces/Event";

export const eventService = {
    getAllEvents,
    saveEvent,
    updateEvent,
    deleteEvent,
    extractDataFromFile,
    saveAllEvents
};

function getAllEvents() {
    return axiosInstance(true, true)
        .get("/events/all", {})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("All events error: " + error);
        });
}

function saveEvent(event: Event) {
    return axiosInstance(true, true)
        .post("/events/new", event)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateEvent(event: Event): Promise<boolean> {
    return axiosInstance(true, true)
        .put("/events/update", event)
        .then((response) => {
            if (response.status === 200) {
                return true;
            }
            return false;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
}

function deleteEvent(eventId: number): Promise<boolean> {
    return axiosInstance(true, true)
        .delete("events/delete/" + eventId)
        .then((response) => {
            if (response.status === 200) {
                return true;
            }
            return false;
        })
        .catch(() => {
            return false;
        });
}

function saveAllEvents(events: Event[]): Promise<Event[]> {
    return axiosInstance(true, true)
        .post("/events/saveAll", events)
        .then(response => {
            if (response.status === 200) {
                return response.data
            }
        })
        .catch(reason => {
            console.log(reason)
        })
}

function removeHeaders(data: Array<Array<any>>,
                       topHeaderLenght: number,
                       middleHeaderLeght: number,
                       bottomHeaderLenght: number,
                       dataGroupLenght: number) {

    data.splice(0, topHeaderLenght)
    data.splice(data.length - bottomHeaderLenght, bottomHeaderLenght)
    if (dataGroupLenght > 0) {
        let indexTmp = dataGroupLenght;
        while (indexTmp < data.length) {
            data.splice(indexTmp, middleHeaderLeght)
            indexTmp = indexTmp + dataGroupLenght
        }
    }
}

function parseCurrency(zl: any|null, gr: any|null) {
    let result = 0.00;
    if(zl != null && gr != null) {
        result = parseFloat(zl + "."+gr)
    } else if(zl != null && gr == null) {
        result = parseFloat(zl + ".00")
    } else if(zl == null && gr != null) {
        result = parseFloat("0."+gr)
    }
    return result;
}

function makeEvents(data: Array<Array<any>>): Event[] {
    let result: Event[] = []
    data.forEach(element => {
        let date = new Date(element[1])
        date.setHours(date.getHours() + 1)
        let event: Event = {
            date: date,
            accoutingNumber: element[2],
            income: parseCurrency(element[3], element[4]),
            expenses: parseCurrency(element[5], element[6]),
            comment: element[7],
        };
        result.push(event);
    })
    return result;
}

function parseData(
    json: any,
    recordWithIds: boolean,
    topHeaderLenght: number,
    middleHeaderLeght: number,
    bottomHeaderLenght: number,
    dataGroupLenght: number
): Event[] {
    let data: Array<Array<any>> = JSON.parse(JSON.stringify(json)).filter((value: Array<any>) => {
        return !value.every(value1 => value1 == null);
    })
    removeHeaders(data, topHeaderLenght, middleHeaderLeght, bottomHeaderLenght, dataGroupLenght)
    return makeEvents(data);
}

function extractDataFromFile(
    file: any,
    recordWithIds: boolean,
    topHeaderLenght: number,
    middleHeaderLeght: number,
    bottomHeaderLenght: number,
    dataGroupLenght: number
) {
    return new Promise<Event[]>(resolve => {
        let reader = new FileReader();
        reader.onload = function (e) {
            let data = e.target!.result;
            let readedData = XLSX.read(data, {type: "binary", cellDates: true});
            let result: Event[] = [];

            readedData.SheetNames.forEach(function (sheetName) {
                let ws = readedData.Sheets[sheetName];
                let wsJson = XLSX.utils.sheet_to_json(ws, {header: 1});
                let events = parseData(
                    wsJson,
                    recordWithIds,
                    topHeaderLenght,
                    middleHeaderLeght,
                    bottomHeaderLenght,
                    dataGroupLenght
                );

                result = [...result, ...events]
            });
            resolve(result)
        };
        reader.readAsBinaryString(file);
    })
}
