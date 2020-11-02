import { CssBaseline } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Title from "./Title";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import InputContainer from "../Input/InputContainer";
import Card from "./Card";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    backgroundColor: "#EBECF0",
    marginLeft: theme.spacing(1),
  },
}));

export default function Column({ column }) {
  const classes = useStyle();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getAllCardsFromColumn(columnId) {
      const response = await axios.get(
        "https://retro-clone-api.herokuapp.com/cards"
      );
      const cards = response.data.filter((card) => card.columnId === columnId);
      // console.log(cards);
      setCards(cards);
    }
    getAllCardsFromColumn(column._id);
  }, [column._id]);

  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <Title columnName={column.name} />
      {cards.map((card) => (
        <Card key={card._id} card={card} />
      ))}
      <InputContainer columnId={column._id} authorId="123test" />
    </Paper>
  );
}
