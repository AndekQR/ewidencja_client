import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventActions } from "../../redux/actions/event.action";
import Event from "../../interfaces/Event";
import { RootState } from "../../redux/reducers";
import "./style.css";
import MaterialTable from "material-table";
import Alert from "@material-ui/lab/Alert";
import { AlertActions } from "../../helpers/alert.constants";
import { alertActions } from "../../redux/actions/alert.actions";
import { eventService } from "../../services/event.service";

// const tableHeader = () => (
//   <thead>
//     <tr>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`} rowSpan={2}>
//         L.p
//       </th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`} rowSpan={2}>
//         Data zdarzenia gospodarczego
//       </th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`} rowSpan={2}>
//         Nr. dowodu księgowego
//       </th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`} colSpan={2}>
//         Przychód
//       </th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`} colSpan={2}>
//         Wydatki
//       </th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`}>Uwagi</th>
//     </tr>
//     <tr>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`}>zł</th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`}>gr</th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`}>zł</th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`}>gr</th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`} />
//     </tr>
//     <tr>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`}>1</th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`}>2</th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`}>3</th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`} colSpan={2}>
//         4
//       </th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`} colSpan={2}>
//         5
//       </th>
//       <th className={`${"thOpkyInsideTg"} ${"thInsideTg"}`}>6</th>
//     </tr>
//   </thead>
// );

const addRowNumber = (allEvents: Event[]) => {
  let rowNumber = 0;
  const data = allEvents.map((event) => {
    rowNumber++;
    return { ...event, rowNumber };
  });
  return data;
};

const EventList = () => {
  const dispatch = useDispatch();
  const lastEvent = useSelector((state: RootState) => state.event.lastEvent);
  var allEvents = useSelector((state: RootState) => state.event.allEvents);
  var alert = useSelector((state: RootState) => {
    return {
      message: state.alert.message,
      type: state.alert.type,
    };
  });

  var [tableData, setTableData] = useState(addRowNumber(allEvents));

  useEffect(() => {
    dispatch(eventActions.getAllEvents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastEvent]);
  useEffect(() => {
    setTableData(addRowNumber(allEvents));
  }, [allEvents]);

  const [selectedRowId, setSelectedRowId] = useState(0);

  return (
    <div>
      {/* {divHeader()} */}
      {/* {allEvents.map((event) => {
        console.log(JSON.stringify(event));
      })} */}

      <div className="table">
        <MaterialTable
          title="Zdarzenia"
          columns={[
            { title: "L.p.", field: "rowNumber", type: "numeric" },
            { title: "Data", field: "date", type: "date" },
            {
              title: "Numer faktury",
              field: "accoutingNumber",
              type: "string",
            },
            {
              title: "Przychód",
              field: "income",
              type: "currency",
              currencySetting: {
                currencyCode: "pln",
                locale: "pl-PL",
              },
            },
            {
              title: "Wydatek",
              field: "expenses",
              type: "currency",
              currencySetting: {
                currencyCode: "pln",
                locale: "pl-PL",
              },
            },
            { title: "Komentarz", field: "comment", type: "string" },
          ]}
          data={tableData}
          onRowClick={(evt, rowData: any) => {
            if (selectedRowId === rowData.id) {
              setSelectedRowId(0);
            } else {
              setSelectedRowId(rowData.id);
            }
          }}
          options={{
            headerStyle: {
              backgroundColor: "#ffca28",
            },
            sorting: true,
            rowStyle: (rowData) => ({
              backgroundColor: selectedRowId === rowData.id ? "#BBB" : "#FFF",
            }),
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowUpdate: (newData, oldData) => {
              return eventService.updateEvent(newData).then((updated) => {
                if (updated) {
                  const dataUpdate = [...tableData];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setTableData([...dataUpdate]);
                  dispatch(alertActions.success("Zaktualizowano!"));
                } else {
                  dispatch(alertActions.error("Błąd aktulizowania!"));
                }
              });
            },
            onRowDelete: (oldData) => {
              return eventService.deleteEvent(oldData.id).then((isDeleted) => {
                if (isDeleted) {
                  const dataDelete = [...tableData];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setTableData([...dataDelete]);
                  dispatch(alertActions.success("Usunięto!"));
                } else {
                  dispatch(alertActions.error("Błąd usuwania!"));
                }
              });
            },
          }}
        />
      </div>
      <div className="alert">
        {alert.type === AlertActions.SUCCESS && (
          <Alert variant="filled" severity="success">
            {alert.message}
          </Alert>
        )}
        {alert.type === AlertActions.ERROR && (
          <Alert variant="filled" severity="success">
            {alert.message}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default EventList;
