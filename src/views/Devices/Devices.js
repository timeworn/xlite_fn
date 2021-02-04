import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { setSelectedDevice } from 'store/actions/device';
import { DevicesService } from 'core/services/devices.service';
import SelectionHeader from '../../components/SectionHeader/SectionHeader';
import { GroupsService } from 'core/services/groups.service';
import EnhancedTable from '../../components/DeviceTable/EnhancedTable';
import AllDevicesMap from 'views/Devices/components/AllDevicesMap/AllDevicesMap';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  mapContainer: {
    position: 'relative',
    width: '100%',
    borderWidth: 10,
    borderStyle: 'solid',
    borderColor: 'white'
  },
  InfoForm: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function Devices () {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [groups, setGroups] = useState([]);
  const [data, setData] = useState([]);

  const allGroups = {
    title: 'Filter by group',
    options: groups
  };

  const [filterId, setFilterId] = useState('');
  const [filterDevice, setFilterDevice] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    DevicesService.instance.retrieveAll().then(devices => setData(devices));
    dispatch(setSelectedDevice([]));
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data])

  useEffect(() => {
    GroupsService.instance.retrieveAll().then(groups => setGroups(groups));
  }, []);

  useEffect(() => {
    filterId ? setFilteredData(data.filter(item => item.group.name === filterId)) : setFilteredData(data);
  }, [filterId])

  return (
    <div className={classes.root} id="screenshot">
      <Grid container spacing={4}>
        <Grid item md={12} xs={12}>
          <SelectionHeader title='' opval={filterId} setOpval={setFilterId} optionInfo={allGroups} align={'left'} />
          <EnhancedTable
            data={data}
            filterId={filterId}
            selectedSerial={filterDevice}
            setSelectedSerial={setFilterDevice}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <div className={classes.mapContainer}>
            <AllDevicesMap data={filteredData} selectedDevice={filterDevice}/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
