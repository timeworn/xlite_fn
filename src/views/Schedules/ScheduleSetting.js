import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import ScheduleDate from 'views/Schedules/components/ScheduleDate';
import { useSelector } from 'react-redux';
import { selectedSchedule } from 'store/selectors/schedule';

export default function ScheduleSetting () {
  const data = useSelector(selectedSchedule || {});
  const [scheduleSetting, setScheduleSetting] = useState([]);

  useEffect(() => {
    if (data) {
      const info = JSON.parse(data.schedule || '{}');
      setScheduleSetting(info.schedule);
    }
  }, [data]);

  return (
    <Box display={'flex'} width={'100%'}>
      {scheduleSetting && scheduleSetting.map((item, key) => (
          <ScheduleDate data={item} key={key} />
        )
      )}
    </Box>
  );
}
