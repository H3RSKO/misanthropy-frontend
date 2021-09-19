// check to see if user is logged in

// display text editor and

// thread id or post that is's replying to are passed in.
// and the posthandler will be displayed either on the bottom of the page if it is a reply to the thread or under a post if it is a reply to the post

import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import postHandlerStyle from "./postHandlerStyle";
import TextEditor from "../TextEditor/TextEditor";
import { Button, Grid } from "@mui/material";
import { makePosts } from "../../store/posts";




const PostHandler = ({classes, setReplyHandler, makePost, threadId, postId, user }) => {
  const [postHandler, setPostHandler] = useState({ title: "", text: "", story: false, userId: '' });
  const submitPost = () => {
    const post = {
      replyTo: postId ? postId : null,
      threadId: threadId,
      text: postHandler.text,
      userId: user.id,
      userName: user.userName
    };
    makePost(threadId, post);
    window.location.reload();  }

  return (
    <Grid container direction="column">
      <TextEditor setPostHandler={setPostHandler} />
      Buttons to reply etc... will go here.
      <Grid item className={classes.postHandlerContainer}>
        <Button onClick={submitPost}>Submit</Button>
      </Grid>
    </Grid>
  );
};

const mapState = (state) => ({
  user: state.users.user,
});

const mapDispatch = (dispatch) => ({
  makePost: (threadId, post) => dispatch(makePosts(threadId, post)),
});

export default connect(mapState, mapDispatch)(withStyles(postHandlerStyle)(PostHandler));

