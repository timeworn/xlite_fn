import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import RefreshIcon from '@material-ui/icons/Refresh';

import { DevicesService } from 'core/services/devices.service';
import { setSelectedDevice } from 'store/actions/device';
import DeviceDetailTitle from 'views/DeviceDetail/components/DeviceDetailTitle/DeviceDetailTitle';
import DeviceEnvironment from 'views/DeviceDetail/components/DeviceEnvironment/DeviceEnvironment';
import DevicePosition from 'views/DeviceDetail/components/DevicePosition/DevicePosition';
import DeviceHistory from 'views/DeviceHistory/DeviceHistory';

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
  const dispatch = useDispatch();

  const [allDevices, setAllDevices] = useState([]);
  const [detailInfo, setDetailInfo] = useState([]);

  // Get device id from url
  const paramsString = window.location.search;
  const params = new URLSearchParams(paramsString);
  const deviceId = params.get('id');


  const handleRefresh = () => {
    DevicesService.instance.retrieveAll().then(devices => setAllDevices(devices));
  };

  useEffect(() => {
    DevicesService.instance.retrieveAll().then(devices => setAllDevices(devices));
  }, []);

  useEffect(() => {
    setDetailInfo(allDevices.filter(device => device.serial === deviceId));
  }, [allDevices]);

  useEffect(() => {
    dispatch(setSelectedDevice(detailInfo[0]));
  }, [detailInfo]);

  return (
    <div className={classes.root} id="device-detail">
      <Grid container spacing={4}>
        <Grid item md={12} xs={12}>
          {detailInfo.length ? <DeviceDetailTitle title={detailInfo[0].name} serial={detailInfo[0].serial} /> : ''}
        </Grid>
        <Grid item md={8} xs={12}>
          <DeviceHistory serial={deviceId}/>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box display={'flex'} justifyContent={'flex-end'} color="primary">
            <IconButton size="small" aria-label="close" onClick={handleRefresh}>
              <RefreshIcon fontSize="large" />
            </IconButton>
          </Box>
          <DeviceEnvironment />
          <DevicePosition />
        </Grid>
      </Grid>
    </div>
  );
};
