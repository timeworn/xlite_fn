import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function DeviceDetailTitle (props) {
  const history = useHistory();
  const { title = "", serial = "" } = props;

  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} color={"white"} position={"relative"} fontSize={"20px"}>
      <Box>
        {title} - {serial}
      </Box>
      <Box position={"absolute"} left={0}>
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => history.goBack()}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  )
}

DeviceDetailTitle.propTypes = {
  title: PropTypes.string,
  serial: PropTypes.string
}
