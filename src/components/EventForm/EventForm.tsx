import React, {useCallback, useState} from "react";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {useDispatch} from "react-redux";
import {eventActions} from "../../redux/actions/event.action";
import { makeStyles, styled } from "@material-ui/styles";
import { Button, Paper, TextField } from "@material-ui/core";


const useStyles = makeStyles({
    paper: {
        padding: '20px',
    },
    upperCase: {
        textTransform: 'uppercase'
    },
    datepicker: {
        margin: '10px'
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitButton: {
        width: '100%',
        margin: '10px'
    },
    logoutButton: {
        margin: '15px'
    }
});

const MyTextField = styled(TextField)({
    margin: '10px'
});

const inputsProps = {
    min: 0,
    step: 0.01
}

export default function EventForm() {
    const [date, setDate] = useState(new Date());
    const [accoutingNumber, setAccoutingNumber] = useState("");
    const [income, setIncome] = useState(0.0);
    const [expenses, setExpenses] = useState(0.0);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    const classes = useStyles();

    const onSubmit = useCallback(event => {
        event.preventDefault();

        dispatch(eventActions.saveEvent({
            date,
            accoutingNumber,
            income,
            expenses,
            comment
        }));

        setDate(new Date());
        setAccoutingNumber("");
        setIncome(0.0);
        setExpenses(0.0);
        setComment("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accoutingNumber, comment, date, expenses, income]);

    return (
        <div>
            <Paper
                elevation={3}
                className={classes.paper}

            >
                <form onSubmit={onSubmit} className={classes.form}>
                    <KeyboardDatePicker
                        required
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker"
                        label="Data"
                        value={date}
                        className={classes.datepicker}
                        onChange={date => {
                            let ms = date?.getMilliseconds();
                            if(ms != null && ms !== undefined){
                                return new Date(ms);
                            }
                        }}
                        // KeyboardButtonProps={{
                        //     'ariaLabel': 'change date',
                        // }}
                    />
                    <MyTextField required type={"text"} id={"accountingNumber"} label={"Numer faktury"}

                                 value={accoutingNumber} onChange={event => setAccoutingNumber(event.target.value)}/>
                    <MyTextField required type={"number"} inputProps={inputsProps} id={"income"} label={"Przychód"}
                                 value={income}
                                 onChange={event => setIncome(parseFloat(event.target.value))}/>
                    <MyTextField required type={"number"} id={"expenses"} label={"Wydatek"}
                                 value={expenses}
                                 onChange={event => setExpenses(parseFloat(event.target.value))}/>
                    <MyTextField required type={"text"} id={"comment"} label={"Komentarz"} value={comment}
                                 onChange={event => setComment(event.target.value)}/>
                    <Button variant={"contained"} type={"submit"} color={"primary"}
                            className={classes.submitButton}>Zapisz</Button>
                </form>
            </Paper>

        </div>
    )

}
