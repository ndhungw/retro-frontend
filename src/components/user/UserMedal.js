import React from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar, Popover, Typography } from "@material-ui/core";
import useAuth from "../../context/auth";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: theme.spacing(1),
    color: "#fff",
  },
  username: {
    alignItems: "center",
    color: "#fff",
    margin: theme.spacing(1),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    margin: theme.spacing(0, 1, 0, 1),
  },
  menuIcon: {
    margin: theme.spacing(0, 2, 0, 0),
  },
}));

export default function UserMedal({ user }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setAuthTokens } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("menu.js: handleLogout!");
    setAuthTokens(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar />
        <Typography className={classes.username}>{user.username}</Typography>
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem component={Link} to={"/profile"}>
          <AccountBoxIcon className={classes.menuIcon} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {" "}
          <ExitToAppIcon className={classes.menuIcon} /> Logout
        </MenuItem>
      </Popover>
    </div>
  );
}
