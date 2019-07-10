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
      width: 200,
      height: 200
    }
  })
);

function ImageAvatars() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Avatar
        alt="Remy Sharp"
        src="https://picsum.photos/id/633/500/501"
        className={classes.bigAvatar}
      />
      <Avatar
        alt="Remy Sharp"
        src="https://picsum.photos/id/613/600/600"
        className={classes.bigAvatar}
      />
      <Avatar
        alt="Remy Sharp"
        src="https://picsum.photos/id/619/600/600"
        className={classes.bigAvatar}
      />
    </Grid>
  );
}

export default ImageAvatars;
