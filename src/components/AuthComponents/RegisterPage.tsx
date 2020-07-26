import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userActions } from "../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { User } from "../../interfaces/User";
import { Grid, Card, CardHeader, CardContent, TextField, Button } from "@material-ui/core";
import { RootState } from "../../redux/reducers";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
  innerForm: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    backgroundColor: "primary",
  },
  inputs: {
    padding: "5px",
  },
  buttonsDiv: {
    marginTop: "10px",
  },
  buttons: {
    padding: "10px",
  },
});

const RegisterPage = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const registering = useSelector((state: RootState) => state.registration.registering);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid justify={"center"} container alignItems={"center"}>
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
        <Card>
          <CardHeader title={"Rejestracja"} />
          <CardContent>
            <form
              name="form"
              onSubmit={(event) => {
                event.preventDefault();

                if (
                  user.firstName &&
                  user.lastName &&
                  user.email &&
                  user.password
                ) {
                  dispatch(
                    userActions.register(
                      {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        verified: true,
                        username: user.email,
                        authorities: [],
                      } as User,
                      user.password
                    )
                  );
                  history.push("/login");
                }
              }}
            >
              <div className={classes.innerForm}>
                <TextField
                  required
                  className={classes.inputs}
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={(event) =>
                    setUser({ ...user, firstName: event.target.value })
                  }
                  variant={"outlined"}
                  label="Imię"
                />

                <TextField
                  required
                  className={classes.inputs}
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      [event.target.name]: event.target.value,
                    })
                  }
                  variant={"outlined"}
                  label="Nazwisko"
                />

                <TextField
                  required
                  className={classes.inputs}
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      [event.target.name]: event.target.value,
                    })
                  }
                  variant={"outlined"}
                  label="Email"
                />

                <TextField
                  required
                  className={classes.inputs}
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      [event.target.name]: event.target.value,
                    })
                  }
                  variant={"outlined"}
                  label="Hasło"
                />

                <div className={classes.buttonsDiv}>
                  <Button
                    type={"submit"}
                    className={classes.buttons}
                    variant={"contained"}
                    color={"primary"}
                  >
                    Rejestruj
                  </Button>
                  {registering && (
                    <img
                      alt="loading..."
                      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                    />
                  )}
                  <Link className={classes.buttons} to="/login">
                    Anuluj
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
