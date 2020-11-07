import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

import BoardsList from "./boards/board-list";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const user = {
    _id: "5f942e17446aa806e46b07ab",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="relative">
          {/* <Toolbar>
            <GradientIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              FunRetroClone
            </Typography>
          </Toolbar> */}
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="DASHBOARD" {...a11yProps(0)} />
            <Tab label="TEAM" {...a11yProps(1)} />
            <Tab label="ANALYTICS" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <BoardsList user={user}></BoardsList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          TEAM PAGE
        </TabPanel>
        <TabPanel value={value} index={2}>
          ANALYTICS PAGE
        </TabPanel>
      </div>
    </React.Fragment>
  );
}
