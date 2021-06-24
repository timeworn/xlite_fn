import React, { useEffect, useState } from 'react';
import { apiUrl } from 'views/Devices/data';
import useStoreState from 'assets/js/use-store-state';
import { currentPos } from 'store/selectors/device';
import { setCurrentUser } from 'store/actions/user';
import Box from '@material-ui/core/Box';
import moment from 'moment';

export default function LatestHistory ({ serial }) {

  const [user, setUser] = useStoreState(currentPos, setCurrentUser);
  const [data, setData] = useState({});
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    fetch(apiUrl, {
      method: 'post',
      body: JSON.stringify({
        query: {
          latest: {
            dev_serial: serial
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
        setData(data);
      });
  }, []);

  useEffect(() => {
    if (data && data.sensor) {
      const items = Object.keys(data.sensor);
      const newItems = items.filter(item => item !== 'dim' && item !== 'mode' && item !== 'relay' && item !== 'status');
      setMeasure(newItems);
    }
  }, [data]);

  return (
    <>
      <Box color="white">
        <Box component="span">Last updated: </Box>
        <Box component="span">{data ? moment(data.timestamp).format('YYYY.MM.DD hh:mm:ss') : ''}</Box>
      </Box>
      <Box display="flex" justifyContent="flex-start" alignItems="center" mt="15px">
        {measure.map((item, key) => (
          <Box key={key} display='flex' flexDirection="column" mr="30px" width="125px">
            <Box bgcolor="#3B3838" color="white" width="100%" p="7px">
              {item}
            </Box>
            <Box bgcolor="#767171" color="white" width="100%" height="100%" display="flex" justifyContent="center" alignItems="center" p="15px" fontSize="25px" fontWeight="600">
              {data.sensor[item]}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

