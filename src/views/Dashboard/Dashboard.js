import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Assignment, AttachMoney, CalendarToday, Message } from '@material-ui/icons';

import { ConnectedDevice, DeviceEvents, Summary } from './components';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import PageHeader from '../../layouts/Main/components/PageHeader/PageHeader';
import { DashboardService } from 'core/services/dashboard.service';
import { DevicesService } from 'core/services/devices.service';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
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
    title: 'WARNING',
    value: statis.warningDeviceCount,
    Icon: Message,
    color: '#f6c23e'
  }];

  return (
    <div className={classes.root} id="screenshot">
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <PageHeader name="Dashboard"/>
      </Grid>
      <Grid container spacing={4}>
        {data.map((item, key) =>
          (<Grid key={key} item lg={3} sm={6} xl={3} xs={12}>
            <Summary title={item.title} value={item.value} Icon={item.Icon} color={item.color}/>
          </Grid>)
        )}
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <SectionHeader title="Events"/>
          <DeviceEvents data={events}/>
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <ConnectedDevice statis={statis}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
