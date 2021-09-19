import React, {useEffect, useState} from "react";
import { Paper, Button, Grid, Box, Card, CardContent, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import storiesStyle from "../Styling/StoriesStyle";
import {fetchThreads} from '../store'
// import {user} from "../store/user";

const Stories = (props) => {
  const { classes, getThreads, threads, user } = props;

  const [stateThreads, setStateThreads] = useState([])

  useEffect(() => {
    const loadThreads = async () => {
      const threads = await setStateThreads(getThreads)
      return threads
    }
    loadThreads()
  }, [])

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item xs={10}>
        <Box className={classes.borderBox} border={3}>
          <Paper elevation={3} square={true} className={classes.root}>
            {user.loggedIn && <Button>
              <Link to='/newthread' className={classes.newThreadLink}>
                New Thread
                </Link>
              </Button>}
            {threads && threads.threads.map((thread) => (
              <Card key={thread.id} className={classes.threads}>
                <Link to={`/threads/${thread.id}`} className={classes.threadLink}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {thread.title}
                  </Typography>
                  Thread Views: {thread.views}
                  Thread Upvotes: {thread.upvotes}
                  {/* add author name */}
                </CardContent>
                </Link>

              </Card>
            ))}
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

Stories.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  threads: state.threads,
  user: state.users.user
})

const mapDispatch = (dispatch) => ({
  getThreads: () => dispatch(fetchThreads())
})

export default connect(mapState, mapDispatch)(withStyles(storiesStyle)(Stories));
