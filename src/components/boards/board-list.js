import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";

// Dialog
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import BoardItem from "./board-item";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function BoardsList({ user }) {
  const classes = useStyles();
  const [openAddBoarDialog, setOpenAddBoarDialog] = useState(false);
  const [newBoardName, setNewBoardName] = useState("New board");
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function getAllBoards() {
      const response = await axios.get(
        // `https://retro-clone-api.herokuapp.com/boards?userId=${user._id}`
        `http://localhost:4000/boards?userId=${user._id}`
      );
      const boards = response.data;
      setBoards(boards);
    }
    getAllBoards();
  }, [user]);

  const handleClose = () => {
    setOpenAddBoarDialog(false);
  };

  const handleCreate = async () => {
    const board = {
      name: newBoardName,
      userId: user._id,
    };

    // update DB
    const response = await axios.post(
      `http://localhost:4000/boards/add`,
      // `https://retro-clone-api.herokuapp.com/boards/add`,
      board
    );
    const newBoard = response.data;
    // console.log(newBoard);

    // update frontend
    setBoards([...boards, newBoard]);

    setOpenAddBoarDialog(false);
  };

  const handleChangeTextField = (e) => {
    setNewBoardName(e.target.value);
  };

  return (
    <React.Fragment>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            My Boards
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<AddCircleOutlinedIcon />}
                  onClick={() => setOpenAddBoarDialog(true)}
                >
                  Add a new board
                </Button>
                {/* Dialog create new board */}
                <Dialog
                  open={openAddBoarDialog}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Create a new board
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <Typography>Create a new empty board.</Typography>
                      <Typography>
                        You can add columns by yourself later.
                      </Typography>
                    </DialogContentText>

                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Board Name"
                      defaultValue="New board"
                      helperText="Enter name of the board"
                      onChange={(e) => handleChangeTextField(e)}
                      // type="search"
                      required
                      fullWidth
                      on
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCreate}
                      variant="contained"
                      color="primary"
                    >
                      CREATE
                    </Button>
                    <Button
                      onClick={handleClose}
                      variant="outlined"
                      color="default"
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={3}
        >
          {boards.map((board) => (
            <BoardItem key={board._id} board={board} classes={classes} />
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
