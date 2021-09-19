import React, {useState, useEffect} from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import appStyles from "./Styling/AppStyle";
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {checkUserCookie} from './store/user';
import {Stories,
ProfilePage,
Signup,
Login,
NewThread,
Thread,
Home} from './Pages/Index'
import Navbar from "./Components/Navbar/Navbar"

// !!!!!!!! set up app/index styles import and style connect on bot

const App = (props) => {
  const { classes, loggedIn, checkUser, user } = props;
  const [currentUser, setCurrentUser] = useState({loggedIn: false})

  if(user !== currentUser) setCurrentUser(user)
  console.log(`Current user is: ${JSON.stringify(currentUser)}`)

  useEffect(() => {
    // checks cookie if there is a valid cookie and no user is loggedIn
    if (document.cookie && !currentUser.loggedIn && document.cookie !== 'connect.sid=') {
      const userChecker = async (cookie) => {
        try {
          await checkUser(cookie)
        } catch(err) {console.log(err)}
      }
      // get plain sid
      const cookieSID = document.cookie.split("=s%3A").pop()
      userChecker(cookieSID)
    }
  }, [])

  return (
    <Grid container direction="row" justify="center" className={classes.container}>
      <Navbar style={{"margin-bottom": "2em"}} />
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/stories" component={Stories} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/threads/:threadId" component={Thread} />
          {loggedIn &&
            <Route path="/newthread" component={NewThread} />
          }
      </Switch>
    </Grid>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  loggedIn: !!state.users.user.loggedIn,
  user: state.users.user
})

const mapDispatch = (dispatch) => ({
    checkUser: (cookie) => dispatch(checkUserCookie(cookie))
})

export default connect(mapState, mapDispatch)(withStyles(appStyles)(App));
