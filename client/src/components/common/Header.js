import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, List, ListItem, ListItemText, SwipeableDrawer, ListItemIcon,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import ListIcon from '@material-ui/icons/List';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import HomeIcon from '@material-ui/icons/Home';

import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../actions/authActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  const history = useHistory();
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

  const [drawerStatus, setState] = React.useState(false);
  const toggleDrawer = (status) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ drawerStatus: status });
  };

  const redirectAndClose = (url) => {
    history.push(url);
    toggleDrawer(false);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(true)}
      onKeyDown={toggleDrawer(true)}
    >
      <List>
        {[
          { link: '/home', text: 'Home', icon: HomeIcon },
          { link: '/teachers', text: 'Teachers', icon: GroupIcon },
          { link: '/classes', text: 'Classes', icon: ListIcon },
          { link: '/', text: 'Timetable', icon: WatchLaterIcon },
          { link: '/substitutions', text: 'Substitutions', icon: WatchLaterIcon },
        ].map((obj, index) => {
          const Icon = obj.icon;
          return (
            <ListItem button key={obj.text} onClick={() => redirectAndClose(obj.link)}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={obj.text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {auth && auth.isAuthenticated === true && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
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
                <MenuItem onClick={() => {
                  handleClose();
                  dispatch(logoutUser());
                }}
                >
                  <Link to="/login">
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
              <SwipeableDrawer
                anchor="left"
                open={drawerStatus.drawerStatus || false}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                {list()}
              </SwipeableDrawer>
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
