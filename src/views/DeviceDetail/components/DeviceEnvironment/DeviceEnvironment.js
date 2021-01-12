import React from 'react';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Input, MenuItem, Select, Slider, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { selectedDevice } from 'store/selectors/device';
import { setSelectedDevice } from 'store/actions/device';

const control_mode = ['MANUAL', 'AUTO', 'SCHEDULED'];

const useStyle = makeStyles((theme) => ({
  selectEmpty: {
    width: '80%',
    height: '40px',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

export default function DeviceEnvironment () {
  const deviceInfo = useSelector(selectedDevice);
  const dispatch = useDispatch();
  const classes = useStyle();

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

  const handleSliderChange = (event, newValue) => {
    dispatch(setSelectedDevice({
      ...deviceInfo,
      [event.target.name]: newValue
    }));
  };

  const handleInputChange = (event) => {
    dispatch(setSelectedDevice({
      ...deviceInfo,
      [event.target.value]: event.target.value === '' ? '' : Number(event.target.value)
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

  console.log(deviceInfo);

  return (
    <Box border={'1px solid white'} margin={'10px'} padding={'10px'}>
      <Box color={'white'}>
        <Box component={'span'}>Device Details - ID: </Box>
        {deviceInfo && <Box component={'span'}>{deviceInfo.serial}</Box>}
      </Box>
      <Box mt={'10px'}>
        {deviceInfo &&
        <TextField
          label="Name"
          margin="dense"
          name="control_mode"
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
          fullwidth
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
              value={typeof deviceInfo.current_dim === 'number' ? deviceInfo.current_dim : 0}
              name="current_dim"
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
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
                step: 1,
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
    </Box>
  );
}
