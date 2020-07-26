import React from "react";
import { userActions } from "../../redux/actions/user.actions";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import {useHistory} from "react-router-dom"
import './style.css'

const Header = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  return (
    <div>
      <Button
        variant={"contained"}
        color={"secondary"}
        onClick={() => {
          dispatch(userActions.logout());
          history.push("/login");
        }}
      >
        Wyloguj
      </Button>
      <Button className="yellowButton" variant={"contained"}>
        Importuj
      </Button>
    </div>
  );
};

export default Header;
