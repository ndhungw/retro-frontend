import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { Link } from "react-router-dom";
import { CardActionArea } from "@material-ui/core";
// import Card from "../columns/Card";
import Card from "@material-ui/core/Card";

export default function BoardItem({ board, classes }) {
  return (
    <Grid item key={board._id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardActionArea component={Link} to={`/boards/${board._id}`}>
          <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {board.name}
            </Typography>
            <Typography align="right" color="textSecondary">
              <ScheduleIcon style={{ fontSize: 14 }} />
              {new Date(board.createdAt).toLocaleString()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            URL
          </Button>
          <Button size="small" color="primary">
            CLONE
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
