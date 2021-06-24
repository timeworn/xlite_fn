import React, { useEffect, useState } from 'react';
import { ActionSetSelectedService } from 'store/actions/user';
import { selectService } from 'store/selectors/user';
import Typography from '@material-ui/core/Typography';
import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';
import useStoreState from 'assets/js/use-store-state';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserService } from 'core/services/user.service';
import CustomizedSnackbars from 'components/SnackbarWrapper/SnackbarWrapper';
import { GroupsService } from 'core/services/groups.service';

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
    marginLeft: theme.spacing(2),
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'white'
    }
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

export default function ServiceUser () {
  const [selected, setSelected] = useStoreState(selectService, ActionSetSelectedService);
  const [allGroups, setAllGroups] = useState([]);
  const [freeGroups, setFreeGroups] = useState([]);
  const [opval, setOpval] = useState(0);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await GroupsService.instance.retrieveAll();
        setAllGroups(data);
        setFreeGroups(data);
      } catch (e) {
        console.log(e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    setFreeGroups(allGroups.filter(item => !selected.groups.some(group => group.id === item.id)));
  }, [selected]);

  const classes = useStyles();

  const handleNameChange = (event) => {
    setSelected({
      ...selected,
      name: event.target.value
    });
  };

  const handleChange = (event) => {
    setOpval(event.target.value);
  };

  const handleDelete = (item) => {
    setSelected({
      ...selected,
      groups: selected.groups.filter(group => group.id !== item.id)
    });
  };

  const handleAddGroup = () => {
    const newGroup = allGroups.filter(group => group.id === opval)[0];
    delete newGroup['users'];
    setSelected({
      ...selected,
      groups: [...selected.groups, newGroup].sort(function(a, b) {
        return a.id - b.id;
      })
    });
  };

  const handleUserDelete = () => {
    if (selected.id) {
      UserService.instance.removeService(selected.id).then(() => {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2000);
        })
        .catch(() => {
          setError(true);
          setTimeout(() => setError(false), 2000);
        });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.groupName}>
        <div className={classes.groupNameLeft}>
          <Typography variant="h5">
            Email(read only)
          </Typography>
          <TextField name="name" variant='outlined' size="small" className={classes.groupText} inputProps={{ readOnly: true }} value={selected ? selected.email : ''} />
        </div>
        <Button variant="contained" color="primary" className={classes.groupDelBtn} onClick={handleUserDelete}>
          Delete This User
        </Button>
      </div>
      <div className={classes.groupNote}>
        <Typography variant="h5">
          Name
        </Typography>
        <TextField name="note" variant='outlined' size="small" className={classes.noteText} value={selected.name} onChange={handleNameChange} />
      </div>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Typography variant="h5">
            Group list
          </Typography>
          <List className={classes.list}>
            {selected.groups ? selected.groups.map((item, key) => {
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
            }) : ''}
          </List>
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Typography variant="h5">
            Add group to this user
          </Typography>
          <Select
            name="val"
            className={classes.selectEmpty}
            variant="outlined"
            size="small"
            value={opval}
            onChange={handleChange}
          >
            <MenuItem value={0} selected>Select Device</MenuItem>
            {freeGroups ? freeGroups.map((item, key) =>
              (<MenuItem key={key} value={item.id}>{item.name}</MenuItem>)
            ) : ''}
          </Select>
          <div className={classes.confirmPart}>
            <Button variant="contained" color="primary" className={classes.confirmBtn} onClick={handleAddGroup}>
              Add
            </Button>
          </div>
          {success ? <CustomizedSnackbars variant="success" message="Successfully deleted!" /> : ''}
          {error ? <CustomizedSnackbars variant="error" message="Failed" /> : ''}
        </Grid>
      </Grid>
    </div>
  );
}