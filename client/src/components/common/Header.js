import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../actions/authActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Scheduler
          </Typography>
          {auth && auth.isAuthenticated === true ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/teachers">
                    Add Teachers
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/classes">
                    Add Classes
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link onClick={() => dispatch(logoutUser())} to="/login">
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <Button
                  color="primary"
                  variant="contained"
                >
                  Login
                </Button>
              </Link>
            &nbsp;&nbsp;
              <Link to="/signup">
                <Button
                  color="primary"
                  variant="contained"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
