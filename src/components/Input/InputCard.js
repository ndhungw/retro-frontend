import React, { useState, useContext } from "react";
import { InputBase, Paper, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { fade, makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import StoreContext from "../../utils/store";

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

export default function InputCard({ columnId, authorId, setIsOpen }) {
  const classes = useStyle();
  const [content, setContent] = useState("");
  // const { addANewCard } = useContext(StoreContext);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleBtnConfirm = async () => {
    const newCard = {
      content,
      authorId,
      columnId,
    };
    const response = await axios.post(
      "https://retro-clone-api.herokuapp.com/cards/add",
      newCard
    );
    console.log(response.data + newCard);

    // addANewCard(newCard);
    setIsOpen(false);
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
            onBlur={() => setIsOpen(false)}
            placeholder="Enter a title of this card ..."
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button
          className={classes.btnConfirm}
          onClick={() => handleBtnConfirm()}
        >
          Add Card
        </Button>
        <IconButton onClick={() => setIsOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}
