import React from 'react';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import ScheduleDetailTitle from 'views/Schedules/components/ScheduleDetailTitle';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    },
  }
}));

export default function ScheduleCreate () {

  const classes = useStyle();
  return (
    <Box className={classes.root} id="screenshot">
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <ScheduleDetailTitle title={"Create a schedule"}/>
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
        </Grid>
      </Grid>
    </Box>
  );
}
