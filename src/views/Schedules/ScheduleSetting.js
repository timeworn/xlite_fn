import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import ScheduleDate from 'views/Schedules/components/ScheduleDate';
import { useSelector } from 'react-redux';
import { selectedMainSchedule, selectedSchedule } from 'store/selectors/schedule';
import { setSelectedMainSchedule } from 'store/actions/schedule';
import useStoreState from 'assets/js/use-store-state';

const defaultSchedule = [
  {
    date: 'Sunday',
    dim: []
  },
  {
    date: 'Monday',
    dim: []
  },
  {
    date: 'Tuesday',
    dim: []
  },
  {
    date: 'Wednesday',
    dim: []
  },
  {
    date: 'Thursday',
    dim: []
  },
  {
    date: 'Friday',
    dim: []
  },
  {
    date: 'Saturday',
    dim: []
  }
];

export default function ScheduleSetting () {
  const [mainSchedule, setMainSchedule] = useStoreState(selectedMainSchedule, setSelectedMainSchedule);
  const data = useSelector(selectedSchedule);
  useEffect(() => {
    if (data && data.id) {
      const info = JSON.parse(data.schedule || '{}');
      setMainSchedule(info.schedule);
    } else if (data && !data.id) {
      setMainSchedule(defaultSchedule);
    }
  }, [data]);

  return (
    <Box display={'flex'} width={'100%'}>
      {mainSchedule && mainSchedule.map((item, key) => (
          <ScheduleDate data={item} key={key} index={key} />
        )
      )}
    </Box>
  );
}
