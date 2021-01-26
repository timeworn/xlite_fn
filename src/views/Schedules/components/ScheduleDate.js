import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ScheduleDim from 'views/Schedules/components/ScheduleDim';
import { IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

export default function ScheduleDate (props) {
  const { data } = props;
  const [dimArray, setDimArray] = useState(data.dim);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSave = () => {

  };

  const handleAdd = () => {
    setIsOpen(true);
  };

  const handleDelete = () => {
    setDimArray(dimArray.slice(0, dimArray.length - 1));
    handleSave();
  };

  return (
    <Box display={'flex'} flexDirection={'column'} mr={'10px'} alignItems={'center'}>
      <Box color={'white'} mb={'15px'} fontSize={'16px'}>
        {data.date}
      </Box>
      {dimArray && dimArray.map((dim, key) => (
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
