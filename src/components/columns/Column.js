import { CssBaseline } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import Title from "./Title";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import InputContainer from "../Input/InputContainer";
import Card from "./Card";
import axios from "axios";
import { StoreContext } from "../../utils/store";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    backgroundColor: "#EBECF0",
    margin: theme.spacing(2),
  },
}));

export default function Column({ column }) {
  const classes = useStyle();
  const { contextCards, setContextCards } = useContext(StoreContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getAllCardsFromColumn(columnId) {
      const response = await axios.get(
        "https://retro-clone-api.herokuapp.com/cards"
      );
      setContextCards(response.data); // get all the cards of all columns of all boards

      // filter from contextCards to get those belong to this column only
      // const cards = response.data.filter((card) => card.columnId === columnId);
      // setCards(cards);
    }
    getAllCardsFromColumn(column._id);
  }, [column._id]);

  // test api query
  // useEffect(() => {
  //   async function getAllCardsFromColumn(columnId) {
  //     // const response = await axios.get(
  //     //   "https://retro-clone-api.herokuapp.com/cards"
  //     // );
  //     const response = await axios.get(
  //       `https://retro-clone-api.herokuapp.com/cards?columnId=${columnId}`
  //     );
  //     setContextCards(response.data); // get all the cards of all columns of all boards

  //     // filter from contextCards to get those belong to this column only
  //     const cards = response.data.filter((card) => card.columnId === columnId);
  //     setCards(cards);
  //   }
  //   getAllCardsFromColumn(column._id);
  // }, [column._id]);

  return (
    <div>
      <Paper className={classes.root} elevation={3}>
        <CssBaseline />
        <Title columnName={column.name} />
        {contextCards
          .filter((card) => card.columnId === column._id)
          .map((card) => (
            <Card key={card._id} card={card} />
          ))}
        {/* {cards
          // .filter((card) => card.columnId === column._id)
          .map((card) => (
            <Card key={card._id} card={card} />
          ))} */}
        <InputContainer type="card" columnId={column._id} authorId="123test" />
      </Paper>
    </div>
  );
}
