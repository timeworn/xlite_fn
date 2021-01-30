import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import ScheduleTable from 'components/ScheduleTable/ScheduleTable';

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    },
    '& .MuiPaper-elevation1': {
      boxShadow: 'none !important'
    }
  }
}));
export default function Schedules () {
  const classes = useStyle();
  return (
    <Box className={classes.root} id="screenshot">
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <SectionHeader title="Schedules" />
          <ScheduleTable />
        </Grid>
      </Grid>
    </Box>
  );
}
