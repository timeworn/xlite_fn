import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { Button, Grid, MenuItem, Select, TextField } from '@material-ui/core';
import ScheduleDetailTitle from 'views/Schedules/components/ScheduleDetailTitle';
import { makeStyles } from '@material-ui/styles';
import Switch from '@material-ui/core/Switch';
import { GroupsService } from 'core/services/groups.service';
import ScheduleSetting from 'views/Schedules/ScheduleSetting';
import { SchedulesService } from 'core/services/schedules.service';
import { setSelectedSchedule } from 'store/actions/schedule';
import { selectedMainSchedule, selectedSchedule } from 'store/selectors/schedule';
import CustomizedSnackbars from 'components/SnackbarWrapper/SnackbarWrapper';
import useStoreState from 'assets/js/use-store-state';
import { useSelector } from 'react-redux';
import * as moment from 'moment';

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    fontFamily: 'Roboto',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white'
    },
    '& .MuiFormLabel-root': {
      color: 'white'
    }
  },
  selectEmpty: {
    width: '30%',
    height: '40px',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

export default function ScheduleDetail () {

  const scheduleInfo = useSelector(selectedMainSchedule);
  const [data, setData] = useState([]);
  const [statusValue, setStatusValue] = useState(true);
  const [allGroups, setAllGroups] = useState([]);
  const [opval, setOpval] = useState('');
  const [currentSchedule, setCurrentSchedule] = useStoreState(selectedSchedule, setSelectedSchedule);
  const [updated, setUpdated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [num, setNum] = useState(0);

  // Get device id from url
  const paramsString = window.location.search;
  const params = new URLSearchParams(paramsString);
  const scheduleId = params.get('id');

  useEffect(() => {
    GroupsService.instance.retrieveAll().then(groups => {
      setAllGroups(groups);
    });
    SchedulesService.instance.retrieveAll().then(schedules => setData(schedules));
  }, []);

  useEffect(() => {
    const result = data.filter(item => item.id === parseInt(scheduleId));
    setCurrentSchedule(result[0]);
  }, [data]);

  useEffect(() => {
    setNum(num + 1);
    if (num === 0) {
      return;
    }
    if (!currentSchedule.id) {
      return;
    }
    SchedulesService.instance.updateSchedule(currentSchedule).then(() => {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }).catch(() => {
      setError(true);
      setTimeout(() => setError(false), 2000);
    });
  }, [updated]);

  useEffect(() => {
    currentSchedule && currentSchedule.id && setOpval(currentSchedule.group.name);
    currentSchedule && currentSchedule.id && setStatusValue(currentSchedule.status === 'ACTIVE');
  }, [currentSchedule]);

  const handleOnOffChange = (event) => {
    setStatusValue(!statusValue);
    setCurrentSchedule({
      ...currentSchedule,
      [event.target.name]: event.target.checked ? 'ACTIVE' : 'NON-ACTIVE'
    });
  };

  const handleNameChange = (event) => {
    setCurrentSchedule({
      ...currentSchedule,
      [event.target.name]: event.target.value
    });
  };

  const handleGroupChange = (event) => {
    setOpval(event.target.value);
    const newGroup = allGroups.filter(item => item.name === event.target.value);
    setCurrentSchedule({
      ...currentSchedule,
      'group': newGroup[0]
    });
  };

  const handleUpdate = () => {
    setUpdated(!updated);
    const currentTime = moment(new Date()).format('YYYY-MM-DD\\THH:mm');
    const schedule = {
      'schedule': scheduleInfo
    };
    setCurrentSchedule({
      ...currentSchedule,
      'schedule': JSON.stringify(schedule),
      'last_updated': currentTime
    });
  };


  const classes = useStyle();
  return (
    <Box className={classes.root} id="screenshot">
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <ScheduleDetailTitle title={'Edit a schedule'} />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Box display={'flex'} alignItems={'center'}>
            <Box color={'white'} fontSize={'20px'}>
              Schedule ID: {scheduleId}
            </Box>
            <Box color={'white'} display={'flex'} justifyContent={'center'} alignItems={'center'} ml={'60px'}>
              <Switch
                checked={statusValue}
                onChange={handleOnOffChange}
                name="status"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <Box ml={'10px'}>{statusValue ? 'Activated' : 'Non-Activated'}</Box>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          {currentSchedule && currentSchedule.id && <TextField
            label="Name"
            margin="dense"
            name="name"
            onChange={handleNameChange}
            required
            value={currentSchedule.name}
            variant="outlined"
          />}
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Box>
            <Box mt={'10px'} color={'white'}>
              Group
            </Box>
            <Box>
              <Select
                displayEmpty
                className={classes.selectEmpty}
                name="group"
                variant="outlined"
                size="small"
                value={opval}
                onChange={handleGroupChange}
              >
                {allGroups && allGroups.map((item, key) =>
                  (<MenuItem key={key} value={item.name}>{item.name}</MenuItem>)
                )}
              </Select>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <ScheduleSetting />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Button variant="contained" color="secondary" onClick={handleUpdate}>
            Update
          </Button>
        </Grid>
      </Grid>
      {success ? <CustomizedSnackbars variant="success" message="Successfully updated!" /> : ''}
      {error ? <CustomizedSnackbars variant="error" message="Failed" /> : ''}
    </Box>
  );
}
