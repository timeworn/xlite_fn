import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { currentPos, selectedDevice } from 'store/selectors/device';
import { DevicesService } from 'core/services/devices.service';
import { setSelectedDevice } from 'store/actions/device';
import { makeStyles } from '@material-ui/styles';
import CustomizedSnackbars from 'components/SnackbarWrapper/SnackbarWrapper';

const useStyle = makeStyles(() => ({
  root: {
    background: '#30373E',
    fontFamily: 'Roboto',
    '& .MuiSlider-root': {
      color: '#4284ff'
    },
    '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#4284ff'
    },
    '& .Mui-checked': {
      color: '#4284ff'
    }
  }
}));

export default function DevicePosition (props) {
  const { cancel, setCancel } = props;
  const dispatch = useDispatch();
  const classes = useStyle();
  const deviceInfo = useSelector(selectedDevice);
  const curPos = useSelector(currentPos);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (curPos.lat !== null) {
      dispatch(setSelectedDevice({
        ...deviceInfo,
        latitude: curPos.lat,
        longitude: curPos.lng
      }));
    }
  }, [curPos]);

  const handleChange = (event) => {
    dispatch(setSelectedDevice({
      ...deviceInfo,
      [event.target.name]: event.target.value
    }));
  };

  const handleSaveInfo = () => {
    DevicesService.instance.updateDevice(deviceInfo.id, deviceInfo).then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      })
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), 2000);
      });
  };

  const handleCancelInfo = () => {
    setCancel(!cancel);
  };
  return (
    <Box border={'1px solid #afadad'} margin={'10px'} padding={'10px'} className={classes.root}>
      <Box color={'white'}>
        <Box fontSize={'20px'} mb={'10px'}>Location </Box>
      </Box>
      <Box mt={'10px'}>
        {deviceInfo &&
        <TextField
          label="Longitude"
          margin="dense"
          name="longitude"
          onChange={handleChange}
          required
          value={deviceInfo.longitude}
          variant="outlined"
        />
        }
      </Box>
      <Box mt={'10px'}>
        {deviceInfo &&
        <TextField
          label="Latitude"
          margin="dense"
          name="latitude"
          onChange={handleChange}
          required
          value={deviceInfo.latitude}
          variant="outlined"
        />
        }
      </Box>
      <Box mt={'30px'} display={'flex'} justifyContent={'space-between'}>
        <Button
          color="primary"
          onClick={handleSaveInfo}
          variant="contained"
        >
          Confirm
        </Button>
        <Button
          color="primary"
          onClick={handleCancelInfo}
          variant="contained"
        >
          Cancel
        </Button>
      </Box>
      {success ? <CustomizedSnackbars variant="success" message="Successfully updated!" /> : ''}
      {error ? <CustomizedSnackbars variant="error" message="Failed" /> : ''}
    </Box>
  );
}


DevicePosition.propTypes = {
  cancel: PropTypes.bool,
  setCancel: PropTypes.func
};
