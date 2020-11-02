import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, fade } from "@material-ui/core/styles";
import InputCard from "../Input/InputCard";
import { Collapse, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(1, 1, 1, 1),
    margin: theme.spacing(1),
  },
  editCard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: "#fff",
    "&:hover": {
      backgroundColor: fade("#000", 0.1),
    },
  },
}));

export default function Card({ card }) {
  const classes = useStyle();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Collapse in={isOpen}>
        <InputCard
          cardId={card._id}
          columnId={card.columnId}
          authorId={card.authorId}
          setIsOpen={setIsOpen}
          oldContent={card.content ? card.content : null}
        />
      </Collapse>
      <Collapse in={!isOpen}>
        <Paper
          className={classes.editCard}
          onClick={() => setIsOpen(!isOpen)}
          elevation={0}
        >
          <Typography>{card.content}</Typography>
        </Paper>
      </Collapse>
    </div>

    // <div>
    //   <Paper className={classes.card}>{card.content}</Paper>
    // </div>
  );
}
