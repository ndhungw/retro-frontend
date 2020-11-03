import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Collapse } from "@material-ui/core";
import InputCard from "./InputCard";

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  addCard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    // background: "#EBECF0",
    background: "#5AAC44",
    color: "#fff",
    "&:hover": {
      backgroundColor: fade("#5AAC44", 0.25),
    },
  },
}));

export default function InputContainer({ columnId, authorId }) {
  const classes = useStyle();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Collapse in={isOpen}>
        <InputCard
          columnId={columnId}
          authorId={authorId}
          setIsOpen={setIsOpen}
        />
      </Collapse>
      <Collapse in={!isOpen}>
        <Paper
          className={classes.addCard}
          onClick={() => setIsOpen(!isOpen)}
          elevation={0}
        >
          <Typography> + Add a card</Typography>
        </Paper>
      </Collapse>
    </div>
  );
}
