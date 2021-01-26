import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ScheduleDim from 'views/Schedules/components/ScheduleDim';
import { IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { selectedMainSchedule, selectedSchedule } from 'store/selectors/schedule';
import { setMainSchedule } from 'store/actions/schedule';

export default function ScheduleDate (props) {
  const { data } = props;
  const dispatch = useDispatch();
  const detailInfo = useSelector(selectedSchedule);
  const mainSchedule = useSelector(selectedMainSchedule);
  const [currentData, setCurrentData] = useState({});
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  useEffect(() => {
    if (detailInfo) {
      const info = JSON.parse(detailInfo.schedule || '{}');
      dispatch(setMainSchedule(info.schedule));
    }
  }, [detailInfo]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAdd = () => {
    setIsOpen(true);
  };

  const handleDelete = () => {

    const newCurrentData = {
      ...currentData,
      'dim': currentData.dim.slice(0, currentData.dim.length - 1)
    };

    const d = [...mainSchedule];
    const index = d.findIndex(v => v.date === newCurrentData.date);
    if (d.length - 1 === index) {
      dispatch(setMainSchedule([...d.slice(0, index), newCurrentData]));
    } else {
      dispatch(setMainSchedule([...d.slice(0, index), newCurrentData, ...d.slice(index + 1)]));
    }
    setCurrentData(newCurrentData);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} mr={'10px'} alignItems={'center'}>
      <Box color={'white'} mb={'15px'} fontSize={'16px'}>
        {data.date}
      </Box>
      {currentData.dim && currentData.dim.map((dim, key) => (
        <ScheduleDim data={dim} key={key} />
      ))}
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <IconButton aria-label="delete" onClick={() => handleAdd()}>
          <AddCircleOutlineIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => handleDelete()}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

ScheduleDate.propTypes = {
  data: PropTypes.object.isRequired
};
