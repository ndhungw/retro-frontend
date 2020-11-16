import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as LinkRRD, Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Axios from "axios";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);

  const [password, setPassword] = useState("");
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [password2, setPassword2] = useState("");
  const [isInvalidPassword2, setIsInvalidPassword2] = useState(false);

  const [email, setEmail] = useState("");
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const [phone, setPhone] = useState("");
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);

  const [isError, setIsError] = useState(false); // error when post sign up
  const [errorMsg, setErrorMsg] = useState("");

  const [isSignedUp, setIsSignedUp] = useState(false);

  if (isSignedUp) {
    return (
      <Redirect
        // to="/login"
        to={{
          pathname: "/login",
          state: {
            message: "Register successfully. Now you can log in!",
            username: username,
          },
        }}
      />
    );
  }

  const postSignUp = async (e) => {
    e.preventDefault();

    const UNAUTHORIZED = 401;
    Axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const { status } = error.response;
        if (status === UNAUTHORIZED) {
          console.log(error.response);
          setIsError(true);
          setErrorMsg(error.response.data.message);
        }
        return Promise.reject(error);
      }
    );

    try {
      const signUpResponse = await Axios.post(
        `http://localhost:4000/auth/signup`,
        {
          username,
          password,
          email,
          phone,
        }
      );

      console.log("signUp response: ", signUpResponse);

      if (signUpResponse.status === 200) {
        setIsSignedUp(true);
      }
    } catch (error) {
      setIsError(true);

      console.log("Error in postSignup: ", error);
    }
  };

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
    if (currentPassword !== password2) {
      setIsInvalidPassword2(true);
    }
  };

  const handleChangePassword2 = (e) => {
    const currentPassword2 = e.target.value;
    setPassword2(currentPassword2);

    if (currentPassword2 !== password) {
      setIsInvalidPassword2(true);
    } else {
      setIsInvalidPassword2(false);
    }
  };

  const handleChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(currentEmail)) {
      setIsInvalidEmail(true);
    } else {
      setIsInvalidEmail(false);
    }
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
    const currentPhone = e.target.value;
    const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

    if (!phoneRegex.test(currentPhone)) {
      setIsInvalidPhone(true);
    } else {
      setIsInvalidPhone(false);
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
          Sign up
        </Typography>
        {isError && (
          <Alert severity="error" color="error">
            {errorMsg}
          </Alert>
        )}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => handleChangeUsername(e)}
                error={isInvalidUsername}
                helperText={isInvalidUsername ? "Invalid username" : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => handleChangeEmail(e)}
                error={isInvalidEmail}
                helperText={isInvalidEmail ? "Invalid email" : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="tel"
                value={phone}
                onChange={(e) => handleChangePhone(e)}
                error={isInvalidPhone}
                helperText={isInvalidPhone ? "Invalid phone number" : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => handleChangePassword(e)}
                error={isInvalidPassword}
                helperText={isInvalidPassword ? "Invalid password" : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm password"
                type="password"
                id="password2"
                autoComplete="new-password"
                value={password2}
                onChange={(e) => handleChangePassword2(e)}
                error={isInvalidPassword2}
                helperText={isInvalidPassword2 ? "Password not match" : null}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => postSignUp(e)}
            disabled={
              isInvalidUsername ||
              isInvalidEmail ||
              isInvalidPhone ||
              isInvalidPassword ||
              isInvalidPassword2
            }
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              {/* <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link> */}
              <LinkRRD to="/login">Already have an account? Sign in</LinkRRD>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
