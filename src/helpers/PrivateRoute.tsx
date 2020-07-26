import React from "react";
import { Redirect, Route } from "react-router-dom";
import { credentialsConstants } from "./credentials.constants";


export const PrivateRoute = ({component, ...rest}:any) => {
  const routeComponent = (props: any) => (
    credentialsConstants.get().token 
    ? React.createElement(component, props)
    : <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>)
  ;
  
  return <Route {...rest} render={routeComponent}/>
};
