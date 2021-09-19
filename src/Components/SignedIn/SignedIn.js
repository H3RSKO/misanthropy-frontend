import React from "react";
import { Dialog, DialogTitle, Button, Box } from "@mui/material"; //see https://material-ui.com/components/dialogs/
import { withStyles } from "@mui/styles";
import signedInStyle from "./SignedInStyle";
import { connect } from "react-redux";

// a popup after succesfu,lly creating account or logging in

const SignedIn = (props) => {
  const { classes, signedInUser, signup } = props;
  const {userName } = signedInUser

  const handleClose = () => {
    // redirect to home page
    props.history.push("/");
  };

  return (
    <Dialog
      className={classes.signedIn}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open
      variant="outlined"
    >
      <DialogTitle id="simple-dialog-title">
        {signup
          ? `Thanks for signing up ${userName}!`
          : `Welcome back ${userName}!`}
      </DialogTitle>
      <Box
        className={classes.signedInBox}
        display="flex"
        justifyContent="center"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          justify="center"
        >
          Continue
        </Button>
      </Box>
    </Dialog>
  );
};

const mapState = (state) => {
  return {
    user: state,
  };
};

export default connect(mapState, null)(withStyles(signedInStyle)(SignedIn));
// have access to redux store and the user that signed in
