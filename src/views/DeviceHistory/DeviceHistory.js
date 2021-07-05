import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import { apiUrl } from 'views/Devices/data';
import { setDeviceHistory, setHistoryItems } from 'store/actions/device';
import { useDispatch, useSelector } from 'react-redux';
import { deviceHistory, historyItems } from 'store/selectors/device';
import StatusChart from 'views/Devices/components/StatusChart/StatusChart';
import useStoreState from 'assets/js/use-store-state';
import { currentUser } from 'store/selectors/user';
import { setCurrentUser } from 'store/actions/user';

// const dataTypes = {
//   title: 'Select Data Type',
//   options: [
//     {
//       id: 'power',
//       name: 'power',
//       title: 'power'
//     },
//     {
//       id: 'temperature',
//       name: 'temperature',
//       title: 'temperature'
//     },
//     {
//       id: 'light',
//       name: 'light',
//       title: 'light'
//     },
//     {
//       id: 'analog_1',
//       name: 'analog_1',
//       title: 'analog_1'
//     },
//     {
//       id: 'analog_2',
//       name: 'analog_2',
//       title: 'analog_2'
//     }
//   ]
// };

const histories =
  {
    title: 'Quick history',
    options: [
      {
        id: 'history1',
        name: '1d',
        title: '1day'
      },
      {
        id: 'history2',
        name: '7d',
        title: '7days'
      },
      {
        id: 'history3',
        name: '14d',
        title: '14days'
      },
      {
        id: 'history4',
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
  const [user, setUser] = useStoreState(currentUser, setCurrentUser);
  const [measureType, setMeasureType] = useState('');
  const [statusValue, setStatusValue] = useState({});
  const [dataTypes, setDataTypes] = useStoreState(historyItems, setHistoryItems);

  useEffect(() => {
    setStatusValue({
      labels: historyData && historyData.map(history =>
        history.timestamp.substring(history.timestamp.length - 15, history.timestamp.length - 4)
      ),
      datasets: [
        {
          label: measureType,
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#3f51b5',
          borderColor: 'grey',
          borderWidth: 1,
          data: historyData && historyData.map(history => history['sensor'][measureType])
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
            interval: '2h'
          },
          api_Key: user.apiKey ? user.apiKey : ''
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
        {dataTypes.title ? <SectionHeader title='' opval={measureType} setOpval={setMeasureType} optionInfo={dataTypes} /> : ''}
        <SectionHeader title='' opval={range} setOpval={setRange} optionInfo={histories} />
      </Box>
      <StatusChart data={statusValue} statusTitle={measureType} />
    </Box>
  );
}

DeviceHistory.propTypes = {
  serial: PropTypes.string.isRequired
};
