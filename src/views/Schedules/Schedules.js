import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import { SchedulesService } from 'core/services/schedules.service';
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
  const [data, setData] = useState([]);
  const [filterId, setFilterId] = useState('');
  const [filterSchedule, setFilterSchedule] = useState('');

  useEffect(() => {
    SchedulesService.instance.retrieveAll().then(devices => setData(devices));
  }, []);

  console.log(data);

  const classes = useStyle();
  return (
    <Box className={classes.root} id="screenshot">
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <SectionHeader title="Schedules" />
          <ScheduleTable data={data} filterId={filterId} selectedSerial={filterSchedule} setSelectedSerial={setFilterSchedule} />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
        </Grid>
      </Grid>
    </Box>
  );
}
