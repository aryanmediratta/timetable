import React, { useEffect, useState } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  red: {
    background: 'red',
  },
  green: {
    backgroundColor: 'green',
  },
});

export default function Popup(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    props.onClose();
  };

  useEffect(() => () => {
    handleClose();
  }, []);

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        ContentProps={{
          classes: {
            root: props.success === true ? classes.green : classes.red,
          },
        }}
        open={open}
        autoHideDuration={props.duration || 3000}
        onClose={handleClose}
        message={props.message || 'Action Completed.'}
        action={(
          <div>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        )}
      />
    </div>
  );
}
