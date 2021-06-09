import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';
import useStoreState from 'assets/js/use-store-state';
import { selectService } from 'store/selectors/user';
import { ActionSetSelectedService } from 'store/actions/user';

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

export default function ServiceUser () {
  const [selected, setSelected] = useStoreState(selectService, ActionSetSelectedService);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.groupName}>
        <div className={classes.groupNameLeft}>
          <Typography variant="h5">
            Email(read only)
          </Typography>
          <TextField name="name" variant='outlined' size="small" className={classes.groupText} value={selected.email} />
        </div>
        <Button variant="contained" color="primary" className={classes.groupDelBtn}>
          Delete This User
        </Button>
      </div>
      <div className={classes.groupNote}>
        <Typography variant="h5">
          Name
        </Typography>
        <TextField name="note" variant='outlined' size="small" fullWidth className={classes.noteText} />
      </div>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Typography variant="h5">
            Group list
          </Typography>
          <List className={classes.list}>
            {/*{selectedDevices.map((item, key) => {*/}
            {/*  const labelId = `checkbox-list-label-${key}`;*/}
            {/*  return (*/}
            {/*    <ListItem key={key} role={undefined} dense button>*/}
            {/*      <ListItemText id={labelId} primary={item.name} />*/}
            {/*      <ListItemSecondaryAction>*/}
            {/*        <IconButton className="delIcon" aria-label="delete" onClick={() => handleDelete(item)}>*/}
            {/*          <DeleteIcon color="secondary" />*/}
            {/*        </IconButton>*/}
            {/*      </ListItemSecondaryAction>*/}
            {/*    </ListItem>*/}
            {/*  );*/}
            {/*})}*/}
          </List>
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Typography variant="h5">
            Add group to this user
          </Typography>
          <Select
            displayEmpty
            name="val"
            className={classes.selectEmpty}
            variant="outlined"
            size="small"
          >
            <MenuItem value="" selected>Select Device</MenuItem>
            {/*{unGroupDevices.map((item, key) =>*/}
            {/*  (<MenuItem key={key} value={item.name}>{item.name}</MenuItem>)*/}
            {/*)}*/}
          </Select>
          <div className={classes.confirmPart}>
            <Button variant="contained" color="primary" className={classes.confirmBtn}>
              Add
            </Button>
          </div>
        </Grid>
      </Grid>
      {/*{deleted ? <CustomizedSnackbars variant="success" message="Successfully updated!" /> : ''}*/}
      {/*{success ? <CustomizedSnackbars variant="success" message="Successfully updated!" /> : ''}*/}
      {/*{error ? <CustomizedSnackbars variant="error" message="Failed" /> : ''}*/}
    </div>
  );
}