import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core';
import Wifi from '@material-ui/icons/Wifi';
import WifiOff from '@material-ui/icons/WifiOff';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: 'transparent'
  },
  chartContainer: {
    position: 'relative',
    height: '210px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const ConnectedDevice = props => {
  const { className, statis, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [statis.onlineDeviceCount, statis.offlineDeviceCount],
        backgroundColor: [
          '#1cc88a',
          '#36b9cc'
        ],
        borderWidth: 1,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Online', 'Offline']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices = [
    {
      title: 'Online',
      value: statis.onlineDeviceCount,
      icon: <Wifi/>,
      color: theme.palette.primary.main
    },
    {
      title: 'Offline',
      value: statis.offlineDeviceCount,
      icon: <WifiOff/>,
      color: theme.palette.error.main
    }
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader/>
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options}/>
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div className={classes.device} key={device.title}>
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

ConnectedDevice.propTypes = {
  className: PropTypes.string,
  statis: PropTypes.object
};

export default ConnectedDevice;
