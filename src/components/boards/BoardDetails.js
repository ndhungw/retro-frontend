import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import Column from "../columns/Column";
import { StoreContext } from "../../utils/store";
import InputContainer from "../Input/InputContainer";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { InputBase } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  columnsContainer: {
    display: "flex",
    minHeight: "100vh",
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
  const { contextColumns, setContextColumns } = useContext(StoreContext);
  const classes = useStyle();
  const { board } = useLocation();
  const [boardName, setBoardName] = useState(board.name);

  useEffect(() => {
    async function getAllColumnsFromBoard(boardId) {
      const response = await axios.get("http://localhost:4000/columns");
      const columns = response.data.filter(
        (column) => column.boardId === boardId
      );
      setContextColumns(columns);
    }
    getAllColumnsFromBoard(id);
  }, [id, setContextColumns]);

  const handleBoardNameChange = (e) => {
    setBoardName(e.target.value);
  };
  const handleBlur = async () => {
    // update DB
    const response = await axios.post(
      `http://localhost:4000/boards/update/${board._id}`,
      {
        name: boardName,
      }
    );
    console.log(response);
  };

  return (
    <React.Fragment>
      <div>
        <InputBase
          className={classes.columnNameInput}
          value={boardName}
          onChange={(e) => handleBoardNameChange(e)}
          // autoFocus
          inputProps={{
            className: classes.input,
          }}
          fullWidth
          onBlur={() => handleBlur()}
        ></InputBase>
      </div>
      <div className={classes.columnsContainer}>
        {contextColumns.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {/* The new col to add stands on the right of columns */}
        <div>
          <Paper elevation={3} className={classes.column}>
            {/* <InputContainer columnId={column._id} authorId="123test" /> */}
            <InputContainer type="column" boardId={id} />
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
}
