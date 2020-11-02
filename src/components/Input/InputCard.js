import React, { useState, useContext } from "react";
import { InputBase, Paper, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { fade, makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import { StoreContext } from "../../utils/store";

const useStyle = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
    // paddingBottom: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: "#5AAC44",
    color: "#fff",
    "&:hover": {
      background: fade("#5AAC44", 0.25),
    },
  },
  confirm: {
    margin: theme.spacing(1),
  },
}));

export default function InputCard({
  cardId,
  columnId,
  authorId,
  setIsOpen,
  oldContent,
}) {
  const classes = useStyle();
  const [content, setContent] = useState(oldContent ? oldContent : "");
  // const { addANewCard } = useContext(StoreContext); /----
  const { contextCards, setContextCards } = useContext(StoreContext);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleBtnConfirm = async () => {
    // update
    if (oldContent) {
      if (!content) {
        // update but empty => delete?
        // ...
        // (implement later!)
      }
      // update the contextCards to fast update frontend
      const updatedContextCards = contextCards.map((card) => {
        if (card._id === cardId) {
          card.content = content;
        }
        return card;
      });

      setContextCards(updatedContextCards);

      // update DB
      const response = await axios.get(
        `https://retro-clone-api.herokuapp.com/cards/${cardId}`
      );
      const cardFound = response.data;
      console.log("cardFound: " + cardFound);

      cardFound.content = content;
      await axios.post(
        `https://retro-clone-api.herokuapp.com/cards/update/${cardId}`,
        cardFound
      );
    } else {
      // if create but no content => cancel
      if (!content) {
        setIsOpen(false);
        return;
      }

      const newCard = {
        content,
        authorId,
        columnId,
      };

      setContextCards([...contextCards, newCard]);
      setIsOpen(false);

      const response = await axios.post(
        "https://retro-clone-api.herokuapp.com/cards/add",
        newCard
      );

      console.log(response.data + newCard);
      setContent("");
    }
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const handleBtnClear = () => {
    if (oldContent) {
      // updating but hit the clear button
      setIsOpen(false);
    } else {
      setIsOpen(false);
      setContent("");
    }
  };

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={(e) => handleChange(e)}
            multiline
            fullWidth
            inputProps={{
              className: classes.input,
            }}
            value={content}
            onBlur={() => handleBlur()}
            placeholder="Enter a title of this card ..."
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button
          className={classes.btnConfirm}
          onClick={() => handleBtnConfirm()}
        >
          {oldContent ? "Update" : "Save"}
        </Button>
        <IconButton onClick={() => handleBtnClear()}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}
