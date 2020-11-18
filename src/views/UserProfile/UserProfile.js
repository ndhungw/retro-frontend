import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  Button,
  TextField,
} from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import Axios from "axios";

// import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isInvalidNewPassword, setIsInvalidNewPassword] = useState(false);
  const [isInvalidNewPassword2, setIsInvalidNewPassword2] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);
  const [isError, setIsError] = useState(false); // error when post sign up
  const [errorMsg, setErrorMsg] = useState("");
  const [isEditedProfile, setIsEditedProfile] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      const getUserInfoResponse = await Axios.get(
        // `http://localhost:4000/auth/user`
        `https://retro-clone-api.herokuapp.com/auth/user`
      );
      const user = getUserInfoResponse.data;
      setUser(user);
      console.log("user", user);
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
    }
    getUserInfo();
  }, [isEditedProfile]);

  const handleChangeNewPassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(currentPassword)) {
      setIsInvalidNewPassword(true);
    } else {
      setIsInvalidNewPassword(false);
    }
    if (currentPassword !== password2) {
      setIsInvalidNewPassword2(true);
    }
  };

  const handleChangeNewPassword2 = (e) => {
    const currentPassword2 = e.target.value;
    setPassword2(currentPassword2);

    if (currentPassword2 !== password) {
      setIsInvalidNewPassword2(true);
    } else {
      setIsInvalidNewPassword2(false);
    }
  };

  const handleChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

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

  const postUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const updateUserResponse = await Axios.post(
        // `http://localhost:4000/users/update/${user._id}`,
        `https://retro-clone-api.herokuapp.com/users/update/${user._id}`,
        {
          password,
          email,
          phone,
        }
      );

      console.log("updateUserResponse: ", updateUserResponse);

      if (updateUserResponse.status === 200) {
        setIsEditedProfile(true);
      }
    } catch (error) {
      const { status } = error.response;
      const BAD_REQUEST = 400;
      if (status === BAD_REQUEST) {
        console.log(error.response);
        setIsError(true);
        setErrorMsg(error.response.data.message);
      }
      console.log("Error in postUpdateProfile: ", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit profile
        </Typography>
        {!isError && isEditedProfile && (
          <Alert severity="success" color="success">
            {"Update profile successfully"}
          </Alert>
        )}
        {isError && (
          <Alert severity="error" color="error">
            {errorMsg}
          </Alert>
        )}
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username || "xxx"}
                InputProps={{
                  readOnly: true,
                }}
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
                onChange={(e) => handleChangeNewPassword(e)}
                error={isInvalidNewPassword}
                helperText={
                  isInvalidNewPassword ? "Invalid new password" : null
                }
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
                onChange={(e) => handleChangeNewPassword2(e)}
                error={isInvalidNewPassword2}
                helperText={
                  isInvalidNewPassword2 ? "New password not match" : null
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => postUpdateProfile(e)}
            disabled={
              username === "" ||
              password === "" ||
              password2 === "" ||
              email === "" ||
              phone === "" ||
              isInvalidEmail ||
              isInvalidPhone ||
              isInvalidNewPassword ||
              isInvalidNewPassword2
            }
          >
            Update
          </Button>
          <Grid container justify="flex-end"></Grid>
        </form>
      </div>
    </Container>
  );
}
