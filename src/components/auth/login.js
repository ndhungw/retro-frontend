import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { Link as LinkRRD, Redirect, useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useAuth from "../../context/auth";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    padding: theme.spacing(1),
    backgroundColor: "yellow",
  },
}));

export default function Login(props) {
  const location = useLocation();
  console.log("location", location);
  const msgFromSignUp = location.state ? location.state.message : null;
  const usernameFromSignUp = location.state ? location.state.username : null;

  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState(
    usernameFromSignUp ? usernameFromSignUp : ""
  );
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  // const referer = props.location.state.referer || "/";
  //
  // const location = useLocation();
  // console.log("location", location);
  // const referer = location.state.referer || "/";
  // console.log("login.js: referer:", referer);
  const referer = "/boards";

  const postLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // `http://localhost:4000/auth/login`
        `https://retro-clone-api.herokuapp.com/auth/login`,
        {
          username: username,
          password: password,
        }
      );
      console.log(response);

      if (response.status === 200) {
        console.log("response.data.token: ", response.data.token);
        setAuthTokens(response.data.token);
        setLoggedIn(true);
      }
    } catch (err) {
      console.log("Error in postLogin: ", err);
      setIsError(true);
    }
  };

  if (isLoggedIn) {
    return <Redirect to={referer} />;
    // return <Redirect to="/login" />;
  }

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    const currentUsername = e.target.value;
    const usernameRegex = /^(?=.{6,20}$)(?![_.0-9])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

    if (!usernameRegex.test(currentUsername)) {
      console.log("regex not pass");
      setIsInvalidUsername(true);
    } else {
      setIsInvalidUsername(false);
    }
  };

  const handleChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(currentPassword)) {
      setIsInvalidPassword(true);
    } else {
      setIsInvalidPassword(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          {!isError && msgFromSignUp && (
            <Alert severity="success" color="success">
              {msgFromSignUp}
            </Alert>
          )}
          {isError && (
            <Alert severity="error" color="error">
              Login failed. Username or password is incorrect.
            </Alert>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => handleChangeUsername(e)}
            error={isInvalidUsername}
            helperText={isInvalidUsername ? "Invalid username" : null}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => handleChangePassword(e)}
            error={isInvalidPassword}
            helperText={isInvalidPassword ? "Invalid password" : null}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => postLogin(e)}
            disabled={username === "" || password === ""}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/* <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
              <LinkRRD to="/signup">{"Don't have an account? Sign Up"}</LinkRRD>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
