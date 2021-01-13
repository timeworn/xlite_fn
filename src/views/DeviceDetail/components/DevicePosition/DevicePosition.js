import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectedDevice } from 'store/selectors/device';
import { DevicesService } from 'core/services/devices.service';
import { setSelectedDevice } from 'store/actions/device';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() => ({
  root: {
    background: '#30373E',
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

export default function DevicePosition () {
  const dispatch = useDispatch();
  const classes = useStyle();
  const deviceInfo = useSelector(selectedDevice);

  const handleChange = (event) => {
    dispatch(setSelectedDevice({
      ...deviceInfo,
      [event.target.name]: event.target.value
    }));
  };

  const handleSaveInfo = () => {
    DevicesService.instance.updateDevice(deviceInfo.id, deviceInfo).then(info => console.log(info))
      .catch(error => console.log(error));
  };

  const handleCancelInfo = () => {
    return false;
  };
  return (
    <Box border={'1px solid #afadad'} margin={'10px'} padding={'10px'} className={classes.root}>
      <Box color={'white'}>
        <Box component={'span'}>Location </Box>
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
    </Box>
  );
}
