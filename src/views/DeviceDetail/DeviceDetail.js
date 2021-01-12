import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import DeviceDetailTitle from 'views/DeviceDetail/components/DeviceDetailTitle/DeviceDetailTitle';
import { DevicesService } from 'core/services/devices.service';

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


export default function DeviceDetail() {
  const classes = useStyles();
  const [allDevices, setAllDevices] = useState([]);
  const [detailInfo, setDetailInfo] = useState([]);

  // Get device id from url
  const paramsString = window.location.search;
  const params = new URLSearchParams(paramsString);
  const deviceId = params.get('id');

  useEffect(() => {
    DevicesService.instance.retrieveAll().then(devices => setAllDevices(devices));
  }, []);

  useEffect(() => {
    setDetailInfo(allDevices.filter(device => device.serial === deviceId));
  }, [allDevices]);

  return (
    <div className={classes.root} id="device-detail">
      <Grid container spacing={4}>
        <Grid item md={12} xs={12}>
          {detailInfo.length ? <DeviceDetailTitle title={detailInfo[0].name} serial={detailInfo[0].serial}/> : "" }
        </Grid>
        <Grid item md={8} xs={12}>
        </Grid>
        <Grid item md={4} xs={12}>
          dfsfasd
        </Grid>
      </Grid>
    </div>
  );
};
