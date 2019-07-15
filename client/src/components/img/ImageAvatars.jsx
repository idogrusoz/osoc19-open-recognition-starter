import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(
  createStyles({
    avatar: {
      margin: 10
    },
    bigAvatar: {
      margin: 20,
      width: 100,
      height: 100
    }
  })
);

function ImageAvatars() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Avatar
        alt="Remy Sharp"
        src="https://picsum.photos/id/633/100/101"
        className={classes.bigAvatar}
      />
    </Grid>
  );
}

export default ImageAvatars;
