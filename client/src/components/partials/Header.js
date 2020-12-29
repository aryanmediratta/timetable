import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
            <Link to='/login'>
                <Button
                    color="primary"
                    variant="contained"
                >
                Login
                </Button>
            </Link>
            &nbsp;&nbsp;
            <Link to='/signup'>
                <Button
                    color="primary"
                    variant="contained"
                >
                Register
                </Button>
            </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
