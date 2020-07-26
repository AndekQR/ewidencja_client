import EventForm from "./EventForm/EventForm";
import EventList from "./EventList/EventList";
import React from "react";
import Header from "./Header/Header";
import { credentialsConstants } from "../helpers/credentials.constants";
import {useHistory} from 'react-router-dom'

const isAuthenticated = (): boolean => {
    const token = credentialsConstants.get().token;
    if(token) return true;
    else return false;
}

const HomeComponent = () => {

    const history = useHistory();
    if(!isAuthenticated){
        history.push("/login")
    }
    return (
        <div>
            <Header/>
            <EventForm/>
            <EventList/>
        </div>
    )
};

export default HomeComponent