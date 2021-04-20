import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import { apiUrl } from 'views/Devices/data';
import { setDeviceHistory } from 'store/actions/device';
import { useDispatch, useSelector } from 'react-redux';
import { deviceHistory } from 'store/selectors/device';
import StatusChart from 'views/Devices/components/StatusChart/StatusChart';

const dataTypes = {
  title: 'Select Data Type',
  options: [
    {
      id: 'power',
      name: 'power',
      title: 'Power (W)'
    },
    {
      id: 'temperature',
      name: 'temperature',
      title: 'Temperature (°C)'
    },
    {
      id: 'light',
      name: 'light',
      title: 'Light sensor (lux)'
    }
  ]
};

const histories =
  {
    title: 'Quick history',
    options: [
      {
        id: 'history1',
        name: '6h',
        title: '6hour'
      },
      {
        id: 'history2',
        name: '12h',
        title: '12hours'
      },
      {
        id: 'history3',
        name: '1d',
        title: '1day'
      },
      {
        id: 'history4',
        name: '7d',
        title: '7days'
      },
      {
        id: 'history5',
        name: '14d',
        title: '14days'
      },
      {
        id: 'history6',
        name: '30d',
        title: '30days'
      }
    ]
  };


export default function DeviceHistory (props) {

  const { serial } = props;

  const historyData = useSelector(deviceHistory);

  const dispatch = useDispatch();

  const [range, setRange] = useState('1d');
  const [measureType, setMeasureType] = useState('power');
  const [statusValue, setStatusValue] = useState({});
  
  let interval = '';

  switch (range) {

    case '6h':
      interval = '1m';
      break;

    case '12h':
      interval = '2m';
      break;

    case '1d':
      interval = '5m';
      break;
    case '7d':
      interval = '30m';
      break;
    case '14d':
      interval = '1h';
      break;
    case '30d':
      interval = '2h';
      break;

    default:
      interval = '2h';
  }
  
  const options = {
    month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', 
    hour12: false
  };

  let chart_color = '#6387bf';

  useEffect(() => {
    setStatusValue({
      labels: historyData && historyData.map(history =>  new Date(history.timestamp).getTime()),
      //labels: historyData && historyData.map(history =>  history.timestamp),
      datasets: [
        {
          label: dataTypes.options.find(o=>o.name === measureType).title,
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(32, 48, 74,0.5)',
          borderColor: chart_color,
          pointBorderColor: chart_color,
          pointBackgroundColor: chart_color,
          pointHoverBackgroundColor: '#005ceb',
          pointHoverBorderColor: '#005ceb',
          pointHoverBorderWidth: 3,
          pointRadius: 0,
          pointHitRadius: 10,
          borderWidth:2,
          pointBorderWidth:1,
          data: historyData && historyData.map(history => history.sensor[measureType])
        }
      ]
    });
  }, [historyData, measureType]);

  useEffect(() => {
    range && fetch(apiUrl, {
      method: 'post',
      body: JSON.stringify({
        query: {
          history: {
            dev_serial: serial,
            time_from: 'now-' + range,
            time_to: 'now',
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
        dispatch(setDeviceHistory(data));
      });
  }, [range]);

  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <SectionHeader title='' opval={measureType} setOpval={setMeasureType} optionInfo={dataTypes} />
        <SectionHeader title='' opval={range} setOpval={setRange} optionInfo={histories} />
      </Box>
      <StatusChart data={statusValue} statusTitle={dataTypes.options.find(o=>o.name === measureType).title} />
    </Box>
  );
}

DeviceHistory.propTypes = {
  serial: PropTypes.string.isRequired
};
