import "./style.css";
import React, {RefObject, useState} from "react";
import {Button, Checkbox, FormControlLabel, Grid, TextField,} from "@material-ui/core";
import {eventService} from "../../services/event.service";
import EventList from "../EventList/EventList";
import Event from "../../interfaces/Event";
import {useDispatch} from "react-redux";
import {eventActions} from "../../redux/actions/event.action";

const cancelButtonAction = (setShowImportComponent: any) => {
    setShowImportComponent(false);
};

const ImportComponent = ({isOpen}: any) => {
    const [recordWithIds, setRecordsWithIds] = useState(false);
    const [topHeaderLenght, setTopHeaderLenght] = useState(0);
    const [middleHeaderLeght, setMiddleHeaderLeght] = useState(0);
    const [bottomHeaderLenght, setBottomHeaderLenght] = useState(0);
    const [dataGroupLenght, setDataGroupLenght] = useState(0);
    const fileRef: RefObject<HTMLInputElement> = React.createRef();

    const [data, setData] = useState<Event[]>([]);

    const dispatch = useDispatch();

    const handleFileFormSubmit = (
        event: any,
        ref: RefObject<HTMLInputElement>
    ) => {
        event.preventDefault();

        eventService.extractDataFromFile(
            ref.current!.files![0],
            recordWithIds,
            topHeaderLenght,
            middleHeaderLeght,
            bottomHeaderLenght,
            dataGroupLenght
        ).then(value => {
            setData(value)
        })
    };

    return (
        <Grid container className="asd">
            <Grid item xs={12} sm={6}>
                <div className="container">
                    <div className="header">Importowanie...</div>
                    <div className="options">
                        <div className="fileInput">
                            <form
                                onSubmit={(event) => {
                                    handleFileFormSubmit(event, fileRef);
                                }}
                            >
                                <input type="file" ref={fileRef}/>
                                <Button variant="contained" type="submit">
                                    Wyślij
                                </Button>
                            </form>
                        </div>
                        <div className="readOptions">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        defaultChecked
                                        onChange={(event) =>
                                            setRecordsWithIds(event.target.checked)
                                        }
                                    />
                                }
                                label="Wczytaj tylko rekordy z indeksami"
                            />
                            <div>
                                <FormControlLabel
                                    control={
                                        <TextField
                                            type="number"
                                            onChange={(event) => {

                                                setTopHeaderLenght(parseInt(event.target.value, 10));
                                            }}
                                        />
                                    }
                                    label="Ilość wierszy nagłówka"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    control={
                                        <TextField
                                            type="number"
                                            onChange={(event) => {
                                                setDataGroupLenght(parseInt(event.target.value, 10));
                                            }}
                                        />
                                    }
                                    label="Ilość wierszy z danymi w grupie"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    control={
                                        <TextField
                                            type="number"
                                            onChange={(event) => {
                                                setMiddleHeaderLeght(parseInt(event.target.value, 10));
                                            }}
                                        />
                                    }
                                    label="Długość nagłówków w środku danych"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    control={
                                        <TextField
                                            type="number"
                                            onChange={(event) => {
                                                setBottomHeaderLenght(parseInt(event.target.value, 10));
                                            }}
                                        />
                                    }
                                    label="Długość końcowego nagłówka"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="preview">
                        <EventList preview={true} data={data}/>
                    </div>
                    <div className="controls">
                        <Button
                            variant="contained"
                            onClick={() => cancelButtonAction(isOpen)}
                            className="cancelButton"
                        >
                            Anuluj
                        </Button>
                        <Button variant="contained" className="importButton" onClick={() => {
                            dispatch(eventActions.saveAllEvents(data))
                            cancelButtonAction(isOpen)
                        }}>
                            Importuj
                        </Button>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default ImportComponent;
