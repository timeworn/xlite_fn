import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import SelectionHeader from '../../components/SectionHeader/SectionHeader';
import * as moment from 'moment';
import { Grid } from '@material-ui/core';
import ShelterMap from './components/MapContainer/MapContainer';
import StatusChart from './components/StatusChart/StatusChart';
import InfoEnterForm from './components/InfoEnterForm/InfoEnterFrom';
import { GroupsService } from 'core/services/groups.service';
import EnhancedTable from '../../components/DeviceTable/EnhancedTable';
import SelectRange from './components/SelectRange/SelectRange';
import { apiUrl } from './data';

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

const histories =
  {
    title: 'Quick history',
    options: [
      {
        id: 'history1',
        name: '1h'
      },
      {
        id: 'history2',
        name: '12h'
      },
      {
        id: 'history3',
        name: '1day'
      },
      {
        id: 'history4',
        name: '7days'
      },
      {
        id: 'history5',
        name: '14days'
      },
      {
        id: 'history6',
        name: '30days'
      }
    ]
  };

export default function Devices() {
  const classes = useStyles();
  const [groups, setGroups] = useState([]);
  const allGroups = {
    title: 'Filter by group',
    options: groups
  };
  const currentDate = new Date();
  const timezone = new Date().getTimezoneOffset() / 60;
  const symbol = timezone > 0 ? '-' : '+';
  const hourValue = Math.abs(timezone) < 10 ? '0'+ Math.abs(timezone) : Math.abs(timezone);
  const finalTimezone = symbol + hourValue + ":00";

  const [filterId, setFilterId] = useState('');
  const [filterHistory, setFilterHistory] = useState('');
  let [fromTime, setFromTime] = useState(moment(new Date(currentDate.getTime() - 60 * 60 * 1000)).format('YYYY-MM-DD\\THH:mm'));
  let [toTime, setToTime] = useState(moment(currentDate).format('YYYY-MM-DD\\THH:mm'));
  const [filterDevice, setFilterDevice] = useState('');
  const [historyData, setHistoryData] = useState([]);

  let interval = '';

  switch (filterHistory) {

    case '1h':
      interval = '1m';
      fromTime = moment(new Date(currentDate.getTime() - 60 * 60 * 1000)).format('YYYY-MM-DD\\THH:mm');
      break;

    case '12h':
      interval = '1m';
      fromTime = moment(new Date(currentDate.getTime() - 12 * 60 * 60 * 1000)).format('YYYY-MM-DD\\THH:mm');
      break;

    case '1day':
      interval = '1m';
      fromTime = moment(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)).format('YYYY-MM-DD\\THH:mm');
      break;
    case '7days':
      interval = '2h';
      fromTime = moment(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD\\THH:mm');
      break;
    case '14days':
      interval = '2h';
      fromTime = moment(new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD\\THH:mm');
      break;
    case '30days':
      interval = '2h';
      fromTime = moment(new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD\\THH:mm');
      break;

    default:
      interval = '2h';
  }

  useEffect(() => {
    setToTime(moment(currentDate).format('YYYY-MM-DD\\THH:mm'));
  }, [filterHistory]);

  useEffect(() => {
    fetch(apiUrl, {
      method: 'post',
      body: JSON.stringify({
        query: {
          history: {
            dev_serial: filterDevice,
            time_from: fromTime+finalTimezone,
            time_to: toTime+finalTimezone,
            interval: interval
          }
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((data) => data.json())
      .then(data => {
        setHistoryData(data);
      });
  }, [filterDevice, fromTime, toTime]);

  const temperature = {
    labels: historyData.map(history =>
      history.timestamp.substring(history.timestamp.length - 15, history.timestamp.length - 4)
    ),
    datasets: [
      {
        label: 'Termperature',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#3f51b5',
        borderColor: 'grey',
        borderWidth: 1,
        data: historyData.map(history => history.sensor.temperature)
      }
    ]
  };

  const humidity = {
    labels: historyData.map(history =>
      history.timestamp.substring(history.timestamp.length - 15, history.timestamp.length - 4)
    ),
    datasets: [
      {
        label: 'Humidity',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#3f51b5',
        borderColor: 'grey',
        borderWidth: 1,
        data: historyData.map(history => history.sensor.humidity)
      }
    ]
  };

  useEffect(() => {
    GroupsService.instance.retrieveAll().then(groups => setGroups(groups));
  }, []);

  return (
    <div className={classes.root} id="screenshot">
      <Grid container spacing={4}>
        <Grid item md={12} xs={12}>
          <SelectionHeader title='' opval={filterId} setOpval={setFilterId} optionInfo={allGroups} align={'left'} />
          <EnhancedTable
            filterId={filterId}
            selectedSerial={filterDevice}
            setSelectedSerial={setFilterDevice}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <div className={classes.mapContainer}>
            <ShelterMap data={historyData}/>
          </div>
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <SelectionHeader title='Sensor history' opval={filterHistory} setOpval={setFilterHistory}
                           optionInfo={histories}/>
          <SelectRange fromTime={fromTime} setFromTime={setFromTime} toTime={toTime} setToTime={setToTime}/>
          <StatusChart data={temperature} statusTitle='Temperature'/>
          <StatusChart data={humidity} statusTitle='Humidity'/>
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <SelectionHeader title='Sensor Settings'/>
          <div className={classes.InfoForm}>
            <InfoEnterForm/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
