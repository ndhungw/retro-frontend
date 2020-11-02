import React, { useState } from "react";

export const StoreContext = React.createContext(null);

export default function StoreContextProvider({ children }) {
  const [contextBoards, setContextBoards] = useState([]);
  const [contextColumns, setContextColumns] = useState([]);
  const [contextCards, setContextCards] = useState([]);

  // const addANewCard = (card) => {
  //   console.log("card.name = " + card.content);
  //   setContextCards([...contextCards, card]);
  // };

  const store = {
    // cards: [cards, setCards],
    // columns: [columns, setColumns],
    // boards: [boards, setBoards],
    contextBoards,
    setContextBoards,
    contextColumns,
    setContextColumns,
    contextCards,
    setContextCards,
    // addANewCard,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
