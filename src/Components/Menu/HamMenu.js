import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Button,
  ListItemText,
  ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import hamMenuStyles from "./HamMenuStyles";
import { logOutCurrentUser } from "../../store/user";

const HamMenu = ({ classes, logOut }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([
    { name: "User Page", link: "/profile", action: null },
    { name: "Logout", link: "/", action: logOut },
  ]);

  const clickHandler = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.hamburgerContainer}>
      <div
        onClick={clickHandler}
        aria-controls="customized-menu"
        aria-haspopup="true"
      >
        <img src="/images/sciMenu2.png" style={{ height: "1.65em" }} />
      </div>
      <Menu
        className={classes.menu}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}

        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id="customized-menu"
        anchorEl={anchorEl}
      >
        {/* need to create userpage */}
        {menuItems.map((item, i) => (
          <MenuItem key={i} onClick={item.action} className={classes.listItem}>
            {/* <ListItem className={classes.listItem}> */}
              <Link to={item.link} className={classes.link}>
                <ListItemText primary={item.name}>{item.name}</ListItemText>
              </Link>
            {/* </ListItem> */}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const mapDispatch = (dispatch) => {
    logOut: (() => dispatch(logOutCurrentUser()))()
};

export default connect(null, mapDispatch)(withStyles(hamMenuStyles)(HamMenu));
