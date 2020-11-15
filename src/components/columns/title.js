import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import axios from "axios";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    backgroundColor: "#EBECF0",
    display: "flex",
    justifyContent: "space-between",
  },
  editableContainer: {
    margin: theme.spacing(1),
  },
  editableTitle: {
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
  iconBtnDeleteColumns: {
    marginRight: theme.spacing(1),
  },
}));
export default function Title({
  columnName,
  columnId,
  deleteColumnFromBoard,
  changeColumnNameFromBoard,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyle();
  const [newColName, setNewColName] = useState(columnName ? columnName : "");
  const [openDeleteColumnDialog, setOpenDeleteColumnDialog] = useState(false);

  const handleChange = (e) => {
    setNewColName(e.target.value);
  };

  const handleBlur = async () => {
    // update frontend
    changeColumnNameFromBoard(columnId, newColName);

    // update DB
    // const response =
    await axios.post(
      `http://localhost:4000/columns/update/${columnId}`,
      // `https://retro-clone-api.herokuapp.com/columns/update/${columnId}`,
      {
        name: newColName,
      }
    );
    // console.log(response);

    setIsEditing(!isEditing);
  };

  const handleCloseDeleteColumnDialog = () => {
    setOpenDeleteColumnDialog(false);
  };

  const handleAcceptDeleteColumnDialog = async () => {
    // update frontend
    deleteColumnFromBoard(columnId);
    // update DB
    // const response =
    await axios.delete(
      // `https://retro-clone-api.herokuapp.com/columns/${columnId}`
      `http://localhost:4000/columns/${columnId}`
    );
    // console.log(response);
    setOpenDeleteColumnDialog(false);
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
        </div>
      )}
      <IconButton
        aria-label="delete"
        className={classes.iconBtnDeleteColumns}
        onClick={() => setOpenDeleteColumnDialog(true)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={openDeleteColumnDialog}
        onClose={handleCloseDeleteColumnDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this column?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will not be able to revert!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAcceptDeleteColumnDialog}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Yes, delete it!
          </Button>
          <Button
            onClick={handleCloseDeleteColumnDialog}
            variant="contained"
            color="default"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
