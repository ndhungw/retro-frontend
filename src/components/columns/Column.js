import { CssBaseline } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Title from "./title";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import InputContainer from "../input/input-container";
import Card from "../cards/card";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    backgroundColor: "#EBECF0",
    margin: theme.spacing(2),
  },
}));

export default function Column({
  column,
  deleteColumnFromBoard,
  changeColumnNameFromBoard,
}) {
  const classes = useStyle();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getAllCardsFromColumn(columnId) {
      const response = await axios.get(
        `https://retro-clone-api.herokuapp.com/cards?columnId=${columnId}`
      );
      setCards(response.data);
    }
    getAllCardsFromColumn(column._id);
  }, [column._id]);

  const addCardFromColumn = async (newCard) => {
    setCards([...cards, newCard]);
  };

  const updateCardFromColumn = async (newCard) => {
    setCards(cards.map((card) => (card._id === newCard._id ? newCard : card)));
  };

  const deleteCardFromColumn = async (cardId) => {
    setCards(cards.filter((card) => card._id !== cardId));
  };
  return (
    <div>
      <Paper className={classes.root} elevation={3}>
        <CssBaseline />
        <Title
          columnName={column.name}
          columnId={column._id}
          deleteColumnFromBoard={deleteColumnFromBoard}
          changeColumnNameFromBoard={changeColumnNameFromBoard}
        />
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            updateCardFromColumn={updateCardFromColumn}
            deleteCardFromColumn={deleteCardFromColumn}
          />
        ))}
        <InputContainer
          addCardFromColumn={addCardFromColumn}
          type="card"
          columnId={column._id}
          authorId="123test"
        />
      </Paper>
    </div>
  );
}
