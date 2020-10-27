import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
// import TabPanel from '@material-ui/lab/TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function LabTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="DASHBOARD" value="dashboard" />
            <Tab label="TEAM" value="team" />
            <Tab label="ANALYTICS" value="analytics" />
          </TabList>
        </AppBar>
        {/* <TabPanel value="dashboard">DASHBOARD</TabPanel>
        <TabPanel value="team">TEAM</TabPanel>
        <TabPanel value="analytics">ANALYTICS</TabPanel> */}
      </TabContext>
    </div>
  );
}
