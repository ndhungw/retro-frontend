import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, fade } from "@material-ui/core/styles";
import InputCard from "../input/input-card";
import { Collapse, Typography } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import Axios from "axios";

const useStyle = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(1),
  },
  card: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    // minHeight: "2.5rem",
    background: "#fff",
    "&:hover": {
      backgroundColor: fade("#000", 0.1),
    },
  },
  authorName: {
    fontSize: "0.6rem",
  },
}));

export default function Card({
  card,
  deleteCardFromColumn,
  updateCardFromColumn,
  index,
}) {
  const classes = useStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUserInfo() {
      // user that is author of this card may be another user, not the logging user
      const userResponse = await Axios.get(
        // `http://localhost:4000/users/${card.userId}`
        `https://retro-clone-api.herokuapp.com/users/${card.userId}`
      );
      const user = userResponse.data;
      setUser(user);
      console.log("card.getUserInfo: user", user);
    }
    getUserInfo();
  }, [card.userId]);

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
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
                <Typography style={{ wordWrap: "break-word" }} display="inline">
                  {card.content}
                </Typography>
                <Typography
                  align="right"
                  color="textSecondary"
                  className={classes.authorName}
                >
                  {user && "Author: " + user.username}
                </Typography>
              </Paper>
            </Collapse>
          </div>
        </div>
      )}
    </Draggable>
  );
}
