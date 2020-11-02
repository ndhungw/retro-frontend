import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    backgroundColor: "#EBECF0",
  },
  editableContainer: {
    margin: theme.spacing(1),
    display: "flex",
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  input: {
    margin: theme.spacing(1),
    "&:focus": {
      backgroundColor: "#ddd",
    },
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
}));
export default function Title({ columnName }) {
  const [open, setOpen] = useState(false);
  const classes = useStyle();

  return (
    <div className={classes.root}>
      {open ? (
        <InputBase
          autoFocus
          value={columnName}
          inputProps={{
            className: classes.input,
          }}
          fullWidth
          onBlur={() => setOpen(!open)}
        />
      ) : (
        <div className={classes.editableContainer}>
          <Typography
            className={classes.editableTitle}
            onClick={() => setOpen(!open)}
          >
            {columnName}
          </Typography>
          <MoreHorizIcon />
        </div>
      )}
    </div>
  );
}
