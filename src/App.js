import "./App.css";
import SimpleTabs from "./components/simple-tabs";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import GradientIcon from "@material-ui/icons/Gradient";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import BoardDetails from "./components/boards/board-details";
import StoreContextProvider from "./utils/store";

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
}));

function App() {
  const classes = useStyles();

  return (
    <StoreContextProvider>
      <Router>
        <AppBar position="relative">
          <Toolbar>
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              className={classes.navLinkHome}
            >
              <GradientIcon className={classes.icon} />

              <Typography variant="h6" color="inherit" noWrap>
                FunRetroClone
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>

        <main>
          <Route path="/" exact component={SimpleTabs} />
          <Route path="/boards" exact component={SimpleTabs} />
          <Route path="/boards/:id" component={BoardDetails} />
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
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
        </footer>
        {/* End footer */}
      </Router>
    </StoreContextProvider>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        1712481@fit
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default App;
