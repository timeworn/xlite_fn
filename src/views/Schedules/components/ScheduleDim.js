import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

export default function ScheduleDim (props) {
  const { data } = props;
  const width = 80 * data.value / 100;
  return (
    <Box width="80px" height="25px" position={'relative'} display={'flex'} alignItems={'center'} justifyContent={'center'} border={'1px solid white'} borderRadius={'5px'} mb={'5px'} textAlign={'center'} color={'white'}>
      {data.time}
      <Box position={'absolute'} width={width + 'px'} bgcolor={'green'} height={'100%'} top={'0px'} left={'0px'} borderRadius={'5px'} zIndex={-1}>
      </Box>
    </Box>
  );
}

ScheduleDim.propTypes = {
  data: PropTypes.object.isRequired
};
