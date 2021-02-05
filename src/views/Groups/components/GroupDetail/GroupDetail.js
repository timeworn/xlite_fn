import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { DevicesService } from '../../../../core/services/devices.service';
import useStoreState from '../../../../assets/js/use-store-state';
import { allGroup, selectedGroup } from '../../../../store/selectors/group';
import { setAllGroup, setSelectedGroup } from '../../../../store/actions/group';
import { GroupsService } from '../../../../core/services/groups.service';
import CustomizedSnackbars from '../../../../components/SnackbarWrapper/SnackbarWrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#222b3d !important',
    borderRadius: 4
  },
  groupName: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  groupNameLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  groupNote: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  groupText: {
    marginLeft: theme.spacing(2)
  },
  selectEmpty: {
    width: '100%',
    height: '25%',
    marginTop: theme.spacing(1)
  },
  confirmBtn: {
    marginTop: theme.spacing(2)
  },
  noteText: {
    marginLeft: 24
  },
  confirmPart: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const GroupDetail = () => {
  const classes = useStyles();
  const [allDevices, setAllDevices] = useState([]);
  const [selected, setSelected] = useStoreState(selectedGroup, setSelectedGroup);
  const [selectedDevices, setSelectedDevices] = useState(selected ? (selected.devices || []) : []);
  const [allGroups, setAllGroups] = useStoreState(allGroup, setAllGroup);
  const [unGroupDevices, setUnGroupDevices] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [data, setData] = useStoreState(allGroup, setAllGroup);

  const [opval, setOpval] = useState('');
  const handleChange = (event) => {
    setOpval(event.target.value);
  };

  useEffect(() => {
    let devices = (selected ? selected.devices : []) || [];
    setSelectedDevices(devices);
  }, [selected]);

  // useEffect(() => {
  //   let devices = (selected ? selected.devices : []) || [];
  //   setSelectedDevices(devices.filter(device => {
  //     return !unGroupDevices.find(_unDevice => _unDevice.name === device.name);
  //   }));
  // }, [selected, unGroupDevices]);

  function handleDelete (device) {
    const remainSelectedDevices = selectedDevices.filter(item => item.name !== device.name);

    setSelectedDevices(remainSelectedDevices);
    selected.devices = remainSelectedDevices;
    setSelected(selected);
    // update group table data
    const index = allGroups.findIndex(group => group.id === selected.id);
    allGroups[index] = selected;
    setAllGroups(allGroups);

    // save to database
    const deviceInfo = {
      ...device,
      group: { id: 0, name: 'UnGroup', note: 'UnGrouped devices' }
    };

    setUnGroupDevices([...unGroupDevices, deviceInfo].sort(function(a, b) {
      return a.id - b.id;
    }));
    DevicesService.instance.updateDevice(deviceInfo.id, deviceInfo).then(info => console.log(info))
      .catch(error => console.log(error));
  }

  const handleConfirm = () => {
    if (opval) {
      // update the unGroupDevices
      setUnGroupDevices(unGroupDevices.filter(device => device.name !== opval));
      const addedDeviceInfo = unGroupDevices.filter(device => device.name === opval)[0];
      delete addedDeviceInfo.group;

      selected.devices = ([...selected.devices, addedDeviceInfo]);
      selected.devices.sort(function(a, b) {
        return a.id - b.id;
      });
      setSelected(selected);
      setSelectedDevices(selected.devices);

      //update the database
      addedDeviceInfo.group = {
        id: selected.id,
        name: selected.name,
        note: selected.note
      };
      DevicesService.instance.updateDevice(addedDeviceInfo.id, addedDeviceInfo).then(info => console.log(info))
        .catch(error => console.log(error));
      setOpval('');
    }
    GroupsService.instance.updateGroup(selected).then(result => {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }).catch(error => {
      setError(true);
      setTimeout(() => setError(false), 2000);
    });
  };

  useEffect(() => {
    DevicesService.instance.retrieveAll().then(devices => setAllDevices(devices));
  }, []);
  useEffect(() => {
    setUnGroupDevices(allDevices.filter(item => item.group === null || item.group.id === 0));
  }, [allDevices]);

  const handleGroupDelete = async () => {
    if (selected.id === undefined) {
      return;
    }
    const groups = data.filter(item => item.id !== selected.id);
    setData(groups);
    const removeResult = await GroupsService.instance.removeGroup(selected.id);

    if (!removeResult.success) {
      return;
    }
    setSelected({
      id: 0,
      name: '',
      note: ''
    });
    setDeleted(true);
    setTimeout(() => setDeleted(false), 2000);
  };

  const handleTextChange = (e) => {
    setSelected({
      ...selected,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.groupName}>
        <div className={classes.groupNameLeft}>
          <Typography variant="h5">
            Name
          </Typography>
          <TextField name="name" variant='outlined' size="small" className={classes.groupText}
            onChange={handleTextChange}
            value={selected.name} />
        </div>
        <Button variant="contained" color="primary" className={classes.groupDelBtn} onClick={handleGroupDelete}>
          Delete This Group
        </Button>
      </div>
      <div className={classes.groupNote}>
        <Typography variant="h5">
          Note
        </Typography>
        <TextField name="note" variant='outlined' size="small" fullWidth className={classes.noteText}
          onChange={handleTextChange}
          value={selected.note} />
      </div>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Typography variant="h5">
            Device list
          </Typography>
          <List className={classes.list}>
            {selectedDevices.map((item, key) => {
              const labelId = `checkbox-list-label-${key}`;
              return (
                <ListItem key={key} role={undefined} dense button>
                  <ListItemText id={labelId} primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton className="delIcon" aria-label="delete" onClick={() => handleDelete(item)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Typography variant="h5">
            Add device to this group
          </Typography>
          <Select
            displayEmpty
            name="val"
            className={classes.selectEmpty}
            variant="outlined"
            size="small"
            value={opval}
            onChange={handleChange}
          >
            <MenuItem value="" selected>Select Device</MenuItem>
            {unGroupDevices.map((item, key) =>
              (<MenuItem key={key} value={item.name}>{item.name}</MenuItem>)
            )}
          </Select>
          <div className={classes.confirmPart}>
            <Button variant="contained" color="primary" className={classes.confirmBtn} onClick={handleConfirm}>
              Add
            </Button>
          </div>
        </Grid>
      </Grid>
      {deleted ? <CustomizedSnackbars variant="success" message="Successfully updated!" /> : ''}
      {success ? <CustomizedSnackbars variant="success" message="Successfully updated!" /> : ''}
      {error ? <CustomizedSnackbars variant="error" message="Failed" /> : ''}
    </div>
  );
};
export default GroupDetail;
