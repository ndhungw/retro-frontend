import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { InputBase } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Column from "../columns/column";
import InputContainer from "../input/input-container";

const useStyle = makeStyles((theme) => ({
  boardTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  columnsContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  column: {
    backgroundColor: "#EBECF0",
    margin: theme.spacing(2, 2, 2, 2),
  },
  columnNameInput: {
    backgroundColor: "#EBECF0",
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

export default function BoardDetails() {
  const { id } = useParams();
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const history = useHistory();
  const classes = useStyle();

  useEffect(() => {
    async function getBoard(boardId) {
      const response = await axios.get(
        // `http://localhost:4000/boards/${boardId}`
        `https://retro-clone-api.herokuapp.com/boards/${boardId}`
      );
      setBoard(response.data);
    }
    getBoard(id);

    async function getAllColumnsFromBoard(boardId) {
      const response = await axios.get(
        "https://retro-clone-api.herokuapp.com/columns"
      );
      const columns = response.data.filter(
        (column) => column.boardId === boardId
      );
      setColumns(columns);
    }
    getAllColumnsFromBoard(id);
  }, [id]);

  const handleBoardNameChange = (e) => {
    setBoard({
      name: e.target.value,
    });
  };
  const handleBlur = async () => {
    // update DB
    const response = await axios.post(
      // `http://localhost:4000/boards/update/${id}`,
      `https://retro-clone-api.herokuapp.com/boards/update/${id}`,
      {
        name: board.name,
      }
    );
    console.log(response);
  };

  const handleDeleteBoard = async () => {
    // update DB
    const response = await axios.delete(
      // `http://localhost:4000/boards/${id}`,
      `https://retro-clone-api.herokuapp.com/boards/${id}`
    );
    console.log(response.data);

    history.goBack();
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleAcceptDeleteDialog = () => {
    handleDeleteBoard();
    setOpenDeleteDialog(false);
  };

  const addColumnFromBoard = (newColumn) => {
    setColumns([...columns, newColumn]);
  };

  const deleteColumnFromBoard = (columnId) => {
    setColumns(columns.filter((column) => column._id !== columnId));
  };

  const changeColumnNameFromBoard = (columnId, newColumnName) => {
    setColumns(
      columns.map((column) => {
        if (column._id === columnId) {
          column.name = newColumnName;
        }
        return column;
      })
    );
  };

  return (
    <React.Fragment>
      <div className={classes.boardTitle}>
        <InputBase
          className={classes.columnNameInput}
          value={board.name}
          onChange={(e) => handleBoardNameChange(e)}
          inputProps={{
            className: classes.input,
          }}
          fullWidth
          onBlur={() => handleBlur()}
        ></InputBase>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={() => setOpenDeleteDialog(true)}
        >
          Delete board
        </Button>
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete this board?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action will not be able to revert!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleAcceptDeleteDialog}
              variant="contained"
              color="secondary"
              autoFocus
            >
              Yes, delete it!
            </Button>
            <Button
              onClick={handleCloseDeleteDialog}
              variant="contained"
              color="default"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={classes.columnsContainer}>
        {columns.map((column) => (
          <Column
            key={column._id}
            column={column}
            deleteColumnFromBoard={deleteColumnFromBoard}
            changeColumnNameFromBoard={changeColumnNameFromBoard}
          />
        ))}

        {/* The new col to add stands on the right of columns */}
        <div>
          <Paper elevation={3} className={classes.column}>
            <InputContainer
              addColumnFromBoard={addColumnFromBoard}
              type="column"
              boardId={id}
            />
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
}
