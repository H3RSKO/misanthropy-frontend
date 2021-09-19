import React from "react";
import { Paper, Button, Grid, Box, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import homeStyle from '../Styling/HomeStyle'
import {Link} from "react-router-dom";



const Home = (props) => {
  const { classes } = props;

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item xs={12} s={10}>
        <Box className={classes.borderBox} border={3}>
        <Paper
          elevation={3}
          square={true}
          className={classes.root}
          variant="outlined"
        >
          <Typography variant="h3" className={classes.subHeader}>Listen to the stories whispered accross the void.</Typography>
          <Grid container direction="row" justifyContent="center" >
            <Grid item xs={6} className={classes.buttons}>
            <Link to="/stories">
              <Button variant="contained" color="primary">
                Stories
              </Button>
            </Link>
            </Grid>
            <Grid item xs={6} className={classes.buttons}>
            <Link to="/">
              <Button variant="contained" color="primary">
                Forum
              </Button>
              </Link>
            </Grid>
            <Grid item xs={6} className={classes.buttons}>
            <Link to="/signup">
              <Button variant="contained" color="primary">
                Signup
              </Button>
              </Link>
            </Grid>
            <Grid item xs={6} className={classes.buttons}>
            <Link to="/login">
              <Button variant="contained" color="primary">
                Login
              </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(homeStyle)(Home);
