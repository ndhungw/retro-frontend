import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Collapse } from "@material-ui/core";
import InputCard from "./input-card";

const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: "300px",
  },
  addANewCardOrColumn: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1, 1, 1, 1),
    // background: "#EBECF0",
    background: "#5AAC44",
    color: "#fff",
    "&:hover": {
      backgroundColor: fade("#5AAC44", 0.25),
    },
  },
}));

export default function InputContainer({
  type,
  boardId,
  columnId,
  userId,
  addCardFromColumn,
  addColumnFromBoard,
}) {
  const classes = useStyle();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Collapse in={isOpen}>
        <InputCard
          type={type}
          boardId={boardId}
          columnId={columnId}
          userId={userId}
          setIsOpen={setIsOpen}
          addCardFromColumn={addCardFromColumn}
          addColumnFromBoard={addColumnFromBoard}
        />
      </Collapse>
      <Collapse in={!isOpen}>
        <Paper
          className={classes.addANewCardOrColumn}
          onClick={() => setIsOpen(!isOpen)}
          elevation={3}
        >
          <Typography>
            {type === "board"
              ? "Add a board"
              : type === "column"
              ? "+ Add a column"
              : "+ Add a card"}
          </Typography>
        </Paper>
      </Collapse>
    </div>
  );
}
