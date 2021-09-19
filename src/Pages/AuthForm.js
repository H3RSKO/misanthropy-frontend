import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Paper} from '@mui/material';
import { withStyles } from "@mui/styles";
import lock from '../media/icons/lock.svg';
import authFormStyles from '../Styling/AuthFormStyles';
import {addNewUser, authenticateUser} from '../store'
import SignedIn from '../Components/SignedIn/SignedIn'

const AuthForm = (props) => {
  const {createUser, signInUser, signup, error, user, state, classes} = props
  // Dont do this 👇
  // const classes = authFormStyles();

  const [currentUser, setCurrentUser] = useState({userName: '', email: null, password: ''})
  const [isSignedIn, setIsSignedIn] = useState(false)

  // Takes form input and saves to state
  const handleInputChange = (event) => {
    setCurrentUser({...currentUser, [event.target.name]: event.target.value})
  }

  if (!isSignedIn && user.loggedIn) {
    setIsSignedIn(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
    signup ? await createUser({userName: currentUser.userName, email: currentUser.email, password: currentUser.password}) : await signInUser({userName: currentUser.userName, password: currentUser.password})
    } catch(err) {
      console.log('this is the error >> ', err)
    }
  }

  if (error) {
    console.log('Massive error!!!', error)
  }

  return (
    <Container component="main" maxWidth="xs">
    <Box className={classes.borderBox} border={3}>
      <Paper elevation={3} square={true} className={classes.root}>
      <CssBaseline />
      <div className={classes.paper} >
        <Avatar className={classes.avatar}>
          <img src={lock} alt='lock-icon' />
        </Avatar>
        <Typography component="h1" variant="h5" color="secondary">
          {signup ? <div>Sign Up</div> : <div>Sign In</div>}
        </Typography>
        <form className={classes.form} noValidate color="secondary" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="userName"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
                onChange={handleInputChange}
                value={currentUser.userName}
              />
            </Grid>
            {signup? <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
                value={currentUser.email}
              />
            </Grid> : <></>}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                value={currentUser.password}
              />
            </Grid>
            {error && <Grid item xs={12} className={classes.error}>
              {error.error.response.data}
            </Grid>}
            <Grid item xs={12} className={classes.disclaimer} >
            Emails are not required for sign-up, but are the only way to regain access to your account if you lose the password.
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}

          >
            {signup ? <div>Sign Up</div> : <div>Sign In</div>}
          </Button>
          {signup ? <Grid container >
            <Grid item>
              <Link href="/login" variant="body1">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> : <Grid container>
            <Grid item>
              <Link href="/signup" variant="body1">
                Don't have an account? Sign Up!
              </Link>
            </Grid>
          </Grid>}
        </form>
      </div>
      </Paper>
        </Box>
        {error && error.response && <div> {error.response.data} </div>}
        {isSignedIn ? <SignedIn signup={signup} history={props.history} signedInUser={user}/> : <></>}
    </Container>
  );
}

const mapSignupState = (state) => {
  return {
    signup: true,
    user: state.users.user,
    error: state.error
  }
}

const mapLoginState = (state) => {
  return {
    signup: false,
    user: state.users.user,
    error: state.users.error,
    state
  }
}


const mapDispatchSignUp = (dispatch) => ({
    createUser: (newUser) => dispatch(addNewUser(newUser))
})

// 1: create thunk to sign in user
// 1.5: make API route to authenticate user
// 2: set authform page to display correct by signup vs login
const mapDispatchSignIn = (dispatch) => ({
    signInUser: (user) => dispatch(authenticateUser(user))
})

export const Signup = connect(mapSignupState, mapDispatchSignUp)(withStyles(authFormStyles)(AuthForm))

export const Login = connect(mapLoginState, mapDispatchSignIn)(withStyles(authFormStyles)(AuthForm))

