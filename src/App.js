import "./App.css";
import SimpleTabs from "./components/SimpleTabs";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import GradientIcon from "@material-ui/icons/Gradient";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import BoardDetails from "./components/boards/BoardDetails";
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

        <Route path="/" exact component={SimpleTabs} />
        <Route path="/boards" exact component={SimpleTabs} />
        <Route path="/boards/:id" component={BoardDetails} />
      </Router>
    </StoreContextProvider>
  );
}

export default App;
