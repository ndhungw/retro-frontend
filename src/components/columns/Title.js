import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { StoreContext } from "../../utils/store";
import axios from "axios";

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
export default function Title({ columnName, columnId }) {
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyle();
  const [newColName, setNewColName] = useState(columnName);
  const { contextColumns, setContextColumns } = useContext(StoreContext);

  const handleChange = (e) => {
    setNewColName(e.target.value);
  };

  const handleBlur = async () => {
    // update frontend
    setContextColumns(
      contextColumns.map((column) => {
        if (column._id === columnId) {
          column.name = newColName;
        }
        return column;
      })
    );

    // update DB
    // console.log(columnId);
    const response = await axios.post(
      `http://localhost:4000/columns/update/${columnId}`,
      {
        name: newColName,
      }
    );
    console.log(response);

    setIsEditing(!isEditing);
  };
  return (
    <div className={classes.root}>
      {isEditing ? (
        <InputBase
          onChange={(e) => handleChange(e)}
          autoFocus
          value={newColName}
          inputProps={{
            className: classes.input,
          }}
          fullWidth
          onBlur={() => handleBlur()}
        />
      ) : (
        <div className={classes.editableContainer}>
          <Typography
            className={classes.editableTitle}
            onClick={() => setIsEditing(!isEditing)}
          >
            {columnName}
          </Typography>
          <MoreHorizIcon />
        </div>
      )}
    </div>
  );
}
