import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '20px',
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
          <Typography className={classes.title} color="textPrimary">
            {props.label}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.sections}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
