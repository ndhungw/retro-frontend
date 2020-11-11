import { CssBaseline } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Title from "./title";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import InputContainer from "../input/input-container";
import Card from "../cards/card";
import axios from "axios";
import { Droppable } from "react-beautiful-dnd";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    backgroundColor: "#EBECF0",
    margin: theme.spacing(2),
  },
  cardContainer: {
    marginTop: theme.spacing(2),
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
        // `https://retro-clone-api.herokuapp.com/cards?columnId=${columnId}`,
        `http://localhost:4000/cards?columnId=${columnId}`
      );
      // setCards(response.data);
      //--
      if (response.data) {
        const sortedCardsList = sort(response.data, column.cardIdsList);
        setCards(sortedCardsList);
        console.log("column.js: setCards OK");
      }
    }
    getAllCardsFromColumn(column._id);
    function sort(cards, cardIdsList) {
      const sortedCardsList = cardIdsList.map((cardId) => {
        const selectedCards = cards.filter((card) => card._id === cardId);
        return selectedCards[0];
      });
      // console.log("sortedCardsList: ", sortedCardsList);
      return sortedCardsList;
    }
  }, [column._id, column.cardIdsList]);

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
        <Droppable droppableId={column._id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={classes.cardContainer}
            >
              {cards.map((card, index) => (
                <Card
                  key={card._id}
                  card={card}
                  updateCardFromColumn={updateCardFromColumn}
                  deleteCardFromColumn={deleteCardFromColumn}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <InputContainer
          addCardFromColumn={addCardFromColumn}
          type="card"
          columnId={column._id}
          userId="5f942dfe446aa806e46b07a9" // user001
        />
      </Paper>
    </div>
  );
}
