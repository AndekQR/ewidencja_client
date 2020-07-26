import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../redux/actions/user.actions";
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";
import {Card, CardHeader, CardContent, TextField, Button, Grid } from "@material-ui/core";
import { RootState } from "../../redux/reducers";
import {useHistory} from "react-router-dom"


const useStyles = makeStyles({

    innerForm: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        backgroundColor: 'primary'
    },
    inputs: {
        padding: '5px'
    },
    buttonsDiv: {
        marginTop: '10px',
    },
    buttons: {
        padding: '10px'
    }
});


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loggingIn = useSelector((state: RootState) => state.authentication.loggingIn);
    const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn);
    const dispatch = useDispatch();
    const classes = useStyles();

    const history = useHistory();

    useEffect(() => {
      if (loggedIn) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    return (
      <Grid justify={"center"} container={true} alignItems={"center"}>
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card>
            <CardHeader title={"Logowanie"} />
            <CardContent>
              <form
                name={"form"}
                onSubmit={(event) => {
                  event.preventDefault();

                  if (username && password) {
                    dispatch(userActions.login(username, password));
                    
                  }
                }}
              >
                <div className={classes.innerForm}>
                  <TextField
                    required
                    className={classes.inputs}
                    variant={"outlined"}
                    label={"Email"}
                    type={"text"}
                    name={"username"}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <TextField
                    required
                    className={classes.inputs}
                    variant={"outlined"}
                    label={"Hasło"}
                    type={"password"}
                    name={"password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <div className={classes.buttonsDiv}>
                    <Button
                      className={classes.buttons}
                      variant={"contained"}
                      color={"primary"}
                      type={"submit"}
                    >
                      Zaloguj
                    </Button>
                    {loggingIn && (
                      <img
                        alt="loading..."
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      />
                    )}
                    <Link className={classes.buttons} to={"/register"}>
                      Zarejestruj się
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
export default LoginPage;
