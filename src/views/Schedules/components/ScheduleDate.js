import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ScheduleDim from 'views/Schedules/components/ScheduleDim';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Input, Slider } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { selectedMainSchedule, selectedSchedule } from 'store/selectors/schedule';
import { setMainSchedule } from 'store/actions/schedule';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

export default function ScheduleDate (props) {
  const classes = useStyles();
  const { data } = props;
  const dispatch = useDispatch();
  const detailInfo = useSelector(selectedSchedule);
  const mainSchedule = useSelector(selectedMainSchedule);
  const [currentData, setCurrentData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('08:00');
  const [dimValue, setDimValue] = useState(20);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  useEffect(() => {
    if (detailInfo) {
      const info = JSON.parse(detailInfo.schedule || '{}');
      dispatch(setMainSchedule(info.schedule));
    }
  }, [detailInfo]);

  const handleAdd = () => {
    setCurrentIndex(mainSchedule.findIndex(v => v.date === currentData.date));
    setOpen(true);
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

  const handleSet = () => {
    if (currentData.dim.length > 8) {
      alert('You can set max 8 slots.');
    } else {
      const newSlot = {
        time: time,
        value: dimValue.toString()
      };
      const newCurrentData = {
        ...currentData,
        'dim': [...currentData.dim, newSlot]
      };

      const original = [...mainSchedule];
      const index = original.findIndex(v => v.date === newCurrentData.date);
      if (original.length - 1 === index) {
        dispatch(setMainSchedule([...original.slice(0, index), newCurrentData]));
      } else {
        dispatch(setMainSchedule([...original.slice(0, index), newCurrentData, ...original.slice(index + 1)]));
      }
      setCurrentData(newCurrentData);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSliderChange = (event, newValue) => {
    setDimValue(newValue);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleInputChange = (event) => {
    setDimValue(Number(event.target.value));
  };

  const handleBlur = () => {
    if (dimValue < 0) {
      setDimValue(0);
    } else if (dimValue > 100) {
      setDimValue(100);
    }
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">slot #{currentIndex}</DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate>
            <TextField
              type="time"
              InputLabelProps={{
                shrink: true
              }}
              value={time}
              inputProps={{
                step: 300 // 5 min
              }}
              onChange={handleTimeChange}
            />
          </form>
          <Box pt={'10px'} color={'white'}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                Dim
              </Grid>
              <Grid item xs>
                <Slider
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  color="secondary"
                  value={dimValue}
                />
              </Grid>
              <Grid item>
                <Input
                  name="dim"
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  value={dimValue}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider'
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSet} color="primary" variant="contained" size={'small'}>
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained" size={'small'}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

ScheduleDate.propTypes = {
  data: PropTypes.object.isRequired
};
