import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";

// Dialog
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import BoardItem from "./BoardItem";
import axios from "axios";
import { StoreContext } from "../../utils/store";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        1712481@fit
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  const { contextBoards, setContextBoards } = useContext(StoreContext);

  useEffect(() => {
    async function getAllBoards() {
      const response = await axios.get(
        "https://retro-clone-api.herokuapp.com/boards"
      );
      const boards = response.data;
      setContextBoards(boards);
    }
    getAllBoards();
  }, [user, setContextBoards]);

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
      // `http://localhost:4000/boards/add`,
      `https://retro-clone-api.herokuapp.com/boards/add`,
      board
    );
    const newBoard = response.data;
    console.log(newBoard);

    // update frontend
    setContextBoards([...contextBoards, newBoard]);

    setOpenAddBoarDialog(false);
  };

  const handleChangeTextField = (e) => {
    setNewBoardName(e.target.value);
  };

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      {/* <AppBar position="relative">
        <Toolbar>
          <GradientIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            FunRetroClone
          </Typography>
        </Toolbar>
        <LabTabs />
      </AppBar> */}
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              My Board
            </Typography>
            {/* <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography> */}
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
                {/* <Grid item>
                  <Button variant="outlined" color="primary">
                    See all boards
                  </Button>
                </Grid> */}
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
            {contextBoards
              .filter((board) => board.userId === user._id)
              .map((board) => (
                <BoardItem key={board._id} board={board} classes={classes} />
              ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
