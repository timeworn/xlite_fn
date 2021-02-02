import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Input, MenuItem, Select, Slider, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { selectedDevice } from 'store/selectors/device';
import { setSelectedDevice } from 'store/actions/device';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { DevicesService } from 'core/services/devices.service';
import CustomizedSnackbars from 'components/SnackbarWrapper/SnackbarWrapper';

const control_mode = ['MANUAL', 'AUTO', 'SCHEDULED'];

const useStyle = makeStyles((theme) => ({
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
  },
  selectEmpty: {
    width: '80%',
    height: '40px',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

export default function DeviceEnvironment (props) {
  const { cancel, setCancel } = props;
  const deviceInfo = useSelector(selectedDevice);
  const dispatch = useDispatch();
  const [statusValue, setStatusValue] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const classes = useStyle();

  useEffect(() => {
    deviceInfo && setStatusValue(deviceInfo.status === 'ONLINE');
  }, [deviceInfo]);

  const handleChange = (e) => {
    dispatch(setSelectedDevice({
      ...deviceInfo,
      [e.target.name]: e.target.value
    }));
  };

  const handleModeChange = (e) => {
    dispatch(setSelectedDevice({
      ...deviceInfo,
      [e.target.name]: e.target.value
    }));
  };

  const handleSliderChange = (e, newValue) => {
    dispatch(setSelectedDevice({
      ...deviceInfo,
      current_dim: newValue
    }));
  };

  const handleInputChange = (event) => {
    dispatch(setSelectedDevice({
      ...deviceInfo,
      [event.target.name]: event.target.value === '' ? '' : Number(event.target.value)
    }));
  };

  const handleBlur = () => {
    if (deviceInfo.current_dim < 0) {
      dispatch(setSelectedDevice({
        ...deviceInfo,
        current_dim: 0
      }));
    } else if (deviceInfo.current_dim > 100) {
      dispatch(setSelectedDevice({
        ...deviceInfo,
        current_dim: 100
      }));
    }
  };

  const handleOnOffChange = (event) => {
    dispatch(setSelectedDevice({ ...deviceInfo, [event.target.name]: event.target.checked ? 'ONLINE' : 'OFFLINE' }));
  };

  const handleSaveInfo = () => {
    DevicesService.instance.updateDevice(deviceInfo.id, deviceInfo).then(result => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      })
      .catch(error => {
        setError(true);
        setTimeout(() => setError(false), 2000);
      });
  };

  const handleCancelInfo = () => {
    setCancel(!cancel);
  };

  return (
    <Box border={'1px solid #afadad'} margin={'10px'} padding={'10px'} className={classes.root}>
      <Box color={'white'} display={'flex'} fontSize={'20px'} mb={'10px'}>
        <Box>Device Details - ID: </Box>
        {deviceInfo && <Box>{deviceInfo.serial}</Box>}
      </Box>
      <Box mt={'10px'}>
        {deviceInfo &&
        <TextField
          label="Name"
          margin="dense"
          name="name"
          onChange={handleChange}
          required
          value={deviceInfo.name}
          variant="outlined"
        />
        }
      </Box>
      <Box mt={'10px'} color={'white'}>
        Control Mode
      </Box>
      <Box>
        {deviceInfo &&
        <Select
          displayEmpty
          className={classes.selectEmpty}
          name="control_mode"
          variant="outlined"
          size="small"
          value={deviceInfo.control_mode}
          onChange={handleModeChange}
        >
          {control_mode.map((item, key) =>
            (<MenuItem key={key} value={item}>{item}</MenuItem>)
          )}
        </Select>
        }
      </Box>
      <Box pt={'10px'} color={'white'}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            Dim
          </Grid>
          {deviceInfo &&
          <Grid item xs>
            <Slider
              name="current_dim"
              step={10}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              color="secondary"
              value={typeof deviceInfo.current_dim === 'number' ? deviceInfo.current_dim : 0}
            />
          </Grid>
          }
          {deviceInfo &&
          <Grid item>
            <Input
              className={classes.input}
              value={deviceInfo.current_dim}
              name="current_dim"
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider'
              }}
            />
          </Grid>
          }
        </Grid>
      </Box>
      <Box color={'white'}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            On/Off
          </Grid>
          <Grid item>
            {deviceInfo &&
            <Switch
              checked={statusValue}
              onChange={handleOnOffChange}
              name="status"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            }
          </Grid>
        </Grid>
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

DeviceEnvironment.propTypes = {
  cancel: PropTypes.bool,
  setCancel: PropTypes.func
};
