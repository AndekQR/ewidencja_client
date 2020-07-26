import React from "react";
import "./App.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Container } from "@material-ui/core";

import {
  Redirect,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import HomeComponent from "./components/HomeComponent";
import { PrivateRoute } from "./helpers/PrivateRoute";
import LoginPage from "./components/AuthComponents/LoginPage";
import RegisterPage from "./components/AuthComponents/RegisterPage";

export default function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BrowserRouter>
        <Container>
          <Switch>
            <PrivateRoute path="/" component={HomeComponent} exact />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Container>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  );
}
