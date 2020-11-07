import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, fade } from "@material-ui/core/styles";
import InputCard from "../input/input-card";
import { Collapse, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(1),
  },
  card: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    minHeight: "2.5rem",
    background: "#fff",
    "&:hover": {
      backgroundColor: fade("#000", 0.1),
    },
  },
}));

export default function Card({
  card,
  deleteCardFromColumn,
  updateCardFromColumn,
}) {
  const classes = useStyle();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Collapse in={isOpen}>
        <InputCard
          type="card"
          cardId={card._id}
          columnId={card.columnId}
          authorId={card.authorId}
          setIsOpen={setIsOpen}
          oldContent={card.content ? card.content : null}
          deleteCardFromColumn={deleteCardFromColumn}
          updateCardFromColumn={updateCardFromColumn}
        />
      </Collapse>
      <Collapse in={!isOpen}>
        <Paper
          className={classes.card}
          onClick={() => setIsOpen(!isOpen)}
          elevation={0}
        >
          <Typography>{card.content}</Typography>
        </Paper>
      </Collapse>
    </div>
  );
}
