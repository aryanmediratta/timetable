import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function FullWidthGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={props.spacing || 0}>
        <Grid item sm={props.componentOneSize}>
          {props.componentOne}
        </Grid>
        <Grid item sm={props.componentTwoSize}>
          {props.componentTwo}
        </Grid>
      </Grid>
    </div>
  );
}

FullWidthGrid.propTypes = {
  componentOneSize: PropTypes.number.isRequired,
  componentTwoSize: PropTypes.number.isRequired,
  componentOne: PropTypes.node.isRequired,
  componentTwo: PropTypes.node.isRequired,
  spacing: PropTypes.number, // Spacing is the space between both the components.
};

FullWidthGrid.defaultProps = {
  spacing: 0,
};
