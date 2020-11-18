import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import GradientIcon from "@material-ui/icons/Gradient";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./views/Home/Home";
import BoardDetails from "./components/boards/board-details";
import StoreContextProvider from "./utils/store";
import { AuthContext } from "./context/auth";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import UserMedal from "./components/user/UserMedal";

import axios from "axios";
import BoardsList from "./components/boards/board-list";
import UserProfile from "./views/UserProfile/UserProfile";
import PrivateRoute from "./auth/PrivateRoute";

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: theme.spacing(1),
    color: "#fff",
  },
  navLinkHome: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textDecoration: "none",
    },
    color: "#fff",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function App() {
  const classes = useStyles();
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [user, setUser] = useState({});

  axios.defaults.headers.common["Authorization"] = "Bearer " + authTokens;

  useEffect(() => {
    async function getUser() {
      if (authTokens) {
        const url = `http://localhost:4000/auth/user`;
        const userResponse = await axios.get(url);
        const user = userResponse.data;
        console.log("user", user);
        setUser(user);
      }
    }
    getUser();
  }, [authTokens]);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <StoreContextProvider>
        <Router>
          <AppBar position="relative">
            <Toolbar className={classes.toolbar}>
              <Link to="/boards" className={classes.navLinkHome}>
                <GradientIcon className={classes.icon} />
                <Typography variant="h6" color="inherit" noWrap>
                  FunRetroClone
                </Typography>
              </Link>
              {authTokens && <UserMedal user={user}></UserMedal>}
            </Toolbar>
          </AppBar>

          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/boards" exact>
                <BoardsList user={user}></BoardsList>
              </PrivateRoute>
              <PrivateRoute path="/boards/:id" exact>
                <BoardDetails user={user} />
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <UserProfile user={user} />
              </PrivateRoute>
            </Switch>
          </main>
          {/* Footer */}
          {/* <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              Something here to give the footer a purpose!
            </Typography>
            <Copyright />
          </footer> */}
          {/* End footer */}
        </Router>
      </StoreContextProvider>
    </AuthContext.Provider>
  );
}

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       {/* <Link color="inherit" href="https://material-ui.com/">
//         1712481@fit
//       </Link>{" "} */}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

export default App;
