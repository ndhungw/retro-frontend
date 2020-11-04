import React, { useState, useContext } from "react";
import { InputBase, Paper, Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { fade, makeStyles } from "@material-ui/core/styles";

import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

import axios from "axios";
import { StoreContext } from "../../utils/store";

const useStyle = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
  },
  // InputBase
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
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function InputCard({
  type,
  boardId,
  columnId,
  cardId,
  authorId,
  oldContent,
  setIsOpen,
}) {
  const classes = useStyle();
  const [content, setContent] = useState(oldContent ? oldContent : "");
  const { contextCards, setContextCards } = useContext(StoreContext);
  const { contextColumns, setContextColumns } = useContext(StoreContext);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const addCard = async () => {
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

    const response = await axios.post(
      "https://retro-clone-api.herokuapp.com/cards/add",
      // "http://localhost:4000/cards/add",
      newCard
    );

    setContextCards([...contextCards, response.data]);
    setIsOpen(false);

    console.log("FROM INPUTCARD.addCard: " + response.data);
    setContent("");
  };

  const deleteCard = async (cardId) => {
    const response = await axios.delete(
      // `http://localhost:4000/cards/${cardId}`
      `https://retro-clone-api.herokuapp.com/cards/${cardId}`
    );
    console.log(response);

    // update frontend
    setContextCards(contextCards.filter((card) => card._id !== cardId));

    setIsOpen(false);
  };

  const updateCard = async (oldContent) => {
    if (!content) {
      // update but content is null => delete
      deleteCard(cardId);
    } else {
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
      const updateResponse = await axios.post(
        // `http://localhost:4000/cards/update/${cardId}`,
        `https://retro-clone-api.herokuapp.com/cards/update/${cardId}`,
        {
          authorId: cardFound.authorId,
          content: cardFound.content,
          columnId: cardFound.columnId,
        }
      );
      console.log(updateResponse);
    }
  };

  const addColumn = async () => {
    const response = await axios.post(
      // "http://localhost:4000/columns/add",
      "https://retro-clone-api.herokuapp.com/columns/add",
      {
        name: content,
        boardId: boardId,
      }
    );
    const newColumn = response.data;

    if (newColumn) {
      setContextColumns([...contextColumns, newColumn]);
    } else {
      // render 1 the? bao loi
    }

    setIsOpen(false);
    setContent("");
  };

  const handleBtnConfirm = async () => {
    if (type === "card") {
      if (oldContent) {
        updateCard(oldContent);
      } else {
        addCard();
      }
    } else if (type === "column") {
      addColumn();
    } else if (type === "board") {
    }
  };

  const handleBlur = () => {
    if (!content) {
      // update but content is null => delete
      setContent(oldContent);
    }
    // else if (oldContent) {
    //   setContent(oldContent);
    // }
    // không handle chỗ này sẽ tốt hơn trong trường hợp người dùng đang edit và bấm mis chuột ra ngoài,
    // khi bấm lại sẽ vẫn giữ được nội dung đang edit
    // muốn khung edit có nội dung hiện tại của card thì xóa hết đi và bẩm ra ngoài là được
    setIsOpen(false);
  };

  const handleBtnCancel = () => {
    if (oldContent) {
      // updating but hit the clear button
      setIsOpen(false);
    } else {
      setIsOpen(false);
      setContent("");
    }
    // setIsOpen(false);
  };

  const handleBtnDelete = () => {
    deleteCard(cardId);
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
            placeholder={
              type === "column"
                ? "Enter column name"
                : "Enter a content of this card ..."
            }
          />
        </Paper>
      </div>
      {/* confirm & delete button */}
      {/* <div>
        <Button
          className={classes.btnConfirm}
          onClick={() => handleBtnConfirm()}
        >
          {oldContent ? "Update" : "Save"}
        </Button>

        <IconButton onClick={() => handleBtnClear()}>
          <ClearIcon />
        </IconButton>
      </div> */}
      <div className={classes.confirm}>
        <Button
          variant="contained"
          // color="primary"
          size="small"
          className={classes.btnConfirm}
          startIcon={<SaveIcon />}
          onClick={() => handleBtnConfirm()}
        >
          {oldContent ? "Update" : "Save"}
        </Button>

        {oldContent ? (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            // className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => handleBtnDelete()}
          >
            Delete
          </Button>
        ) : (
          <Button
            variant="contained"
            color="default"
            size="small"
            // className={classes.button}
            startIcon={<ClearIcon />}
            onClick={() => handleBtnCancel()}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
