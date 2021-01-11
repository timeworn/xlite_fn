import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Assignment, AttachMoney, CalendarToday, Message } from '@material-ui/icons';

import { ConnectedDevice, DeviceEvents, Summary } from './components';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { DashboardService } from 'core/services/dashboard.service';
import { DevicesService } from 'core/services/devices.service';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
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

const Dashboard = () => {
  const classes = useStyles();
  const [statis, setStatis] = useState({});
  const [devices, setDevices] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        //Get overview
        const data = await DashboardService.instance.getOverview();
        setStatis(data);

        const devices = await DevicesService.instance.retrieveAll();
        setDevices(devices);

        //get events
        const events = devices.filter(item => item.event !== 'OK');
        setEvents(events);

        setLoading(true);
      } catch (e) {
        // TODO: show error toast or something like that
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const data = [{
    title: 'TOTAL DEVICES',
    value: statis.totalDeviceCount,
    Icon: CalendarToday,
    color: '#4e73df'
  }, {
    title: 'ONLINE',
    value: statis.onlineDeviceCount,
    Icon: AttachMoney,
    color: '#1cc88a'
  }, {
    title: 'OFFLINE',
    value: statis.offlineDeviceCount,
    Icon: Assignment,
    color: '#36b9cc'
  }, {
    title: 'UNKNOWN',
    value: statis.warningDeviceCount,
    Icon: Message,
    color: '#f6c23e'
  }];

  return (
    <div className={classes.root} id="screenshot">
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <SectionHeader title="OVERVIEW"/>
      </Grid>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={"-16px"}>
        <Box width={'80%'}>
          <Grid container spacing={4} direction="row" justify={"center"} alignItems={"center"}>
            <Grid item md={6} xs={12}>
              {data.map((item, key) =>
                (<Grid item key={key} md={12} xs={12}>
                  <Summary color={item.color} Icon={item.Icon} title={item.title} value={item.value} />
                </Grid>)
              )}
            </Grid>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <ConnectedDevice statis={statis}/>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <SectionHeader title="LATEST EVENTS"/>
          <DeviceEvents data={events}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
