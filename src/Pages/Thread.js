import React, { useEffect, useState } from "react";
import {
  Paper,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import threadStyle from "../Styling/ThreadStyle";
import { fetchPosts, makePosts } from "../store/posts";
import { getThreadInfo } from "../store/threads";
import TextEditor from "../Components/TextEditor/TextEditor";
import DOMPurify from "dompurify";
import PostHandler from "../Components/PostHandler/PostHandler";
import Post from "../Components/Post/Post";

// to reply add the thread or post id to the replyHandler
// when the reply handler isn't false, it displays the textEditor

const Thread = ({
  getPosts,
  posts,
  users,
  classes,
  getThread,
  makePost,
  match,
}) => {
  const threadId = match.params.threadId;
  const [currentPosts, setCurrentPosts] = useState();
  const [replyHandler, setReplyHandler] = useState(false);

  useEffect(() => {
    const loadPostsAndThreadInfo = async () => {
      const posts = await getPosts(threadId);
      const threadInfo = await getThread(threadId);
      console.log("threadInfo >> ", threadInfo.thread);
      setCurrentPosts(posts);
    };
    loadPostsAndThreadInfo();
  }, []);

  // const submitPost = () => {
  //   console.log('submitPost >> ', newPost);
  //   const post = {
  //     threadId: threadId,
  //     content: newPost.content,
  //     userId: users.user.id,
  //     userName: users.user.name
  //   };
  //   makePost(threadId, post);
  //   setNewPost(false);
  // }
  // const createMarkup = (html) => {
  //   html = html.replace(/<a /g, '<a style="color: green;"');
  //   return {
  //     __html: DOMPurify.sanitize(html),
  //   };
  // };

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item xs={12} sm={10}>
        <Paper
          elevation={3}
          square={true}
          className={classes.root}
          variant="outlined"
        >
          <Typography type="h1">
            <Button
              onClick={() => setReplyHandler({ type: "thread", id: threadId })}
              style={{ justifySelf: "flex-end" }}
            >
              Reply to Thread
            </Button>
          </Typography>
          <Box style={{ display: "grid" }}>
            {currentPosts &&
              currentPosts.posts.map((p) => (
                <Card className={classes.postContainer} key={p.id}>
                  <Post p={p} />
                  {replyHandler &&
                    replyHandler.type === "post" &&
                    replyHandler.id === p.id && (
                      <PostHandler threadId={threadId} postId={p.id} />
                    )}
                  <div style={{display: "grid"}}>
                  <Button
                    onClick={() => setReplyHandler({ type: "post", id: p.id })}
                    style={{ justifySelf: "flex-end", fontSize: "0.75rem" }}
                  >
                    Reply to Post
                  </Button>
                  </div>
                </Card>
              ))}
          </Box>
          {replyHandler &&
            replyHandler.type === "thread" && <PostHandler threadId={threadId} />}
        </Paper>
      </Grid>
    </Grid>
  );
};
// thunk

const mapState = (state) => ({
  user: state.users.user,
  posts: state.posts.posts,
  thread: state.threads.thread,
});

const mapDispatch = (dispatch) => ({
  getPosts: (threadId) => dispatch(fetchPosts(threadId)),
  makePost: (threadId, post) => dispatch(makePosts(threadId, post)),
  getThread: (threadId) => dispatch(getThreadInfo(threadId)),
});

export default connect(mapState, mapDispatch)(withStyles(threadStyle)(Thread));
