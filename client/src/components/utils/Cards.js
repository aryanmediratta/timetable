import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ShowCard(props) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h2">
            Class:
            {props.label}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Number of Sections:
            {props.sections}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
