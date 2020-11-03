import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Column from "../columns/Column";
import { StoreContext } from "../../utils/store";
import InputContainer from "../Input/InputContainer";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexWrap: "wrap",
  },
  column: {
    backgroundColor: "#EBECF0",
    margin: theme.spacing(2, 2, 2, 2),
  },
}));

export default function BoardDetails() {
  const { id } = useParams();
  const { contextColumns, setContextColumns } = useContext(StoreContext);
  const classes = useStyle();

  useEffect(() => {
    async function getAllColumnsFromBoard(boardId) {
      const response = await axios.get(
        "https://retro-clone-api.herokuapp.com/columns"
      );
      const columns = response.data.filter(
        (column) => column.boardId === boardId
      );
      setContextColumns(columns);
    }
    getAllColumnsFromBoard(id);
  }, [id]);

  return (
    <React.Fragment>
      <div className={classes.root}>
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
