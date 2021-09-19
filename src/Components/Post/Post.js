import React, { useEffect, useState } from "react";
import postStyle from "./postStyle";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import DOMPurify from "dompurify";
import PostHandler from "../PostHandler/PostHandler";
import dayjs from "dayjs";
const {
  Card,
  Grid,
  CardContent,
  Typography,
  Button,
} = require("@mui/material");

const createMarkup = (html) => {
  html = html.replace(/<a /g, '<a style="color: green;"');
  return {
    __html: DOMPurify.sanitize(html),
  };
};

const Post = ({ p, classes}) => {
  // console.log({ p });
  return (
      <Grid
        container
        spacing={1}
        // justify="spaceBetween"
        direction="row"

      >
        <Grid className={classes.userInfo} item xs={2}>
          <Grid item xs={12}>
            <img src={p.user.photo} className={classes.userPhoto}/>
          </Grid>
          <Grid item xs={12}>
            {p.user.userName}
          </Grid>
          <Grid item xs={12}>
            Joined {dayjs(p.user.createdAt).format("MM-DD-YYYY")}
          </Grid>
        </Grid>
        <Grid item xs={10} className={classes.postTextContainer}>
          <CardContent className={classes.postText}>
            <Typography
              // className={classes.postText}
              dangerouslySetInnerHTML={createMarkup(p.text)}
            >
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
  );
};

export default withStyles(postStyle)(Post);
