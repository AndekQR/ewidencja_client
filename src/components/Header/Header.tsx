import React, { useState } from "react";
import { userActions } from "../../redux/actions/user.actions";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import {useHistory} from "react-router-dom"
import './style.css'
import ImportComponent from "../ImportComponent/Import";

const Header = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const [showImportComponent, setShowImportComponent] = useState(false);

  return (
    <div>
      {showImportComponent && <ImportComponent isOpen={setShowImportComponent} />}
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
      <Button
        className="yellowButton"
        variant={"contained"}
        onClick={(event) => {
          event.preventDefault();
          setShowImportComponent(true);
        }}
      >
        Importuj
      </Button>
    </div>
  );
};

export default Header;
