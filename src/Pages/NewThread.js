import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button
} from "@mui/material";
import { withStyles } from "@mui/styles";
import {connect} from 'react-redux';

import TextEditor from "../Components/TextEditor/TextEditor";
import NewThreadStyles from "../Styling/NewThreadStyle";
import {createThreads} from "../store/threads"
import { makePosts } from "../store/posts";

const NewThread = ({ classes, user, createThread, history }) => {
  const [postHandler, setPostHandler] = useState({ title: "", text: "", story: false, userId: '' });

  useEffect(() => {
    setPostHandler({...postHandler, userId: user.id})
  }, [])


  // callback that is passed to TextEditor that controls all text before hitting backend
  const textHandler = (event) => {
    if (event.target.name === "story") {
      setPostHandler({ ...postHandler, [event.target.name]: event.target.checked });
    } else {
      setPostHandler({ ...postHandler, [event.target.name]: event.target.value });
    }
  };

  // submits new thread
  const threadSubmitter = async () => {
    try {
      const data = await createThread(postHandler)
      history.push(`/threads/${data.thread.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item xs={10}>
        <Box className={classes.borderBox} border={3}>
          <Paper
            elevation={3}
            square={true}
            className={classes.root}
            variant="outlined"
          >
            <Typography variant="h3" className={classes.subHeader}>
              New Thread
            </Typography>
            {/* thread title */}
            <Grid container spacing={2} className={classes.topContainer} alignItems="center">
              <Grid item xs={9}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  required={true}
                  name="title"
                  label="Thread Title"
                  type="title"
                  id="title"
                  onChange={textHandler}
                  value={postHandler.title}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkBox}
                      checked={postHandler.story}
                      onChange={textHandler}
                      name="story"
                      color="secondary"
                    />
                  }
                  label="Is Thread A Story?"
                />
              </Grid>
            </Grid>
            <TextEditor setPostHandler={setPostHandler} postHandler={postHandler}/>
            <div className={classes.buttonContainer}>
            <Button variant="contained" color="secondary" onClick={threadSubmitter}>
                  Create Thread
            </Button>
            </div>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};
const mapDispatchCreateThreads = (dispatch) => ({
  createThread: (thread) => dispatch(createThreads(thread))
})

const mapState = (state) => {
  return {
    user: state.users.user
  }
}

export default connect(mapState, mapDispatchCreateThreads)(withStyles(NewThreadStyles)(NewThread));
