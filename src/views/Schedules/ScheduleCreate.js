import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import useStoreState from 'assets/js/use-store-state';
import { Box, Button, Grid, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ScheduleDetailTitle from 'views/Schedules/components/ScheduleDetailTitle';
import Switch from '@material-ui/core/Switch';
import ScheduleSetting from 'views/Schedules/ScheduleSetting';
import CustomizedSnackbars from 'components/SnackbarWrapper/SnackbarWrapper';
import { GroupsService } from 'core/services/groups.service';
import { setSelectedSchedule } from 'store/actions/schedule';
import { selectedMainSchedule, selectedSchedule } from 'store/selectors/schedule';
import { SchedulesService } from 'core/services/schedules.service';


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

export default function ScheduleCreate () {

  const history = useHistory();
  const [statusValue, setStatusValue] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useStoreState(selectedSchedule, setSelectedSchedule);
  const mainSchedule = useSelector(selectedMainSchedule);
  const [allGroups, setAllGroups] = useState([]);
  const [opval, setOpval] = useState('');
  const [saved, setSaved] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    GroupsService.instance.retrieveAll().then(groups => {
      setAllGroups(groups);
    });
  }, []);

  useEffect(() => {
    setIndex(index + 1);
    if (index === 0) {
      return;
    }
    if (!currentSchedule.name || !(currentSchedule.group && currentSchedule.group.id)) {
      return;
    }
    SchedulesService.instance.createSchedule(currentSchedule).then(() => {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      history.push("/schedules");
    }).catch(() => {
      setError(true);
      setTimeout(() => setError(false), 2000);
    });
  }, [saved]);

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
    const info = allGroups.filter(item => item.name === event.target.value);
    setOpval(event.target.value);
    setCurrentSchedule({
      ...currentSchedule,
      [event.target.name]: info[0]
    });
  };

  const handleSave = () => {
    setSaved(!saved);
    const schedule = {
      'schedule': mainSchedule
    };
    setCurrentSchedule({
      ...currentSchedule,
      'schedule': JSON.stringify(schedule)
    });
  };

  const classes = useStyle();
  return (
    <Box className={classes.root} id="schedule_create">
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <ScheduleDetailTitle title={'Create a schedule'} />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Box display={'flex'} alignItems={'center'}>
            <Box color={'white'} fontSize={'20px'}>
              New Schedule
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
          <TextField
            label="Name"
            margin="dense"
            name="name"
            onChange={handleNameChange}
            required
            variant="outlined"
          />
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
                onChange={handleGroupChange}
                value={opval}
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
          <Button variant="contained" color="secondary" onClick={handleSave}>
            Create
          </Button>
        </Grid>
      </Grid>
      {success ? <CustomizedSnackbars variant="success" message="Successfully created!" /> : ''}
      {error ? <CustomizedSnackbars variant="error" message="Failed" /> : ''}
    </Box>
  );
}
