import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  mapContainer: {
    position: 'relative',
    width: '100%',
    borderWidth: 10,
    borderStyle: 'solid',
    borderColor: 'white'
  },
  InfoForm: {
    display: 'flex',
    justifyContent: 'center'
  }
}));


export default function DeviceDetail () {
  const classes = useStyles();

  // Get device id from url
  const paramsString = window.location.search;
  const params = new URLSearchParams(paramsString);
  const deviceId = params.get('id');

  return (
    <div className={classes.root} id="screenshot">
      <Grid container spacing={4}>
        fsdfds
      </Grid>
    </div>
  );
};
