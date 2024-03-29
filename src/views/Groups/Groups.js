import React, { useEffect, useState } from 'react';
import PageHeader from '../../layouts/Main/components/PageHeader/PageHeader';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@material-ui/core';
import SelectionHeader from '../../components/SectionHeader/SectionHeader';
import GroupTable from '../../components/GroupTable/GroupTable';
import GroupDetail from './components/GroupDetail';
import { GroupsService } from '../../core/services/groups.service';
import CustomizedSnackbars from '../../components/SnackbarWrapper/SnackbarWrapper';
import { setAllGroup } from '../../store/actions/group';
import useStoreState from 'assets/js/use-store-state';
import { selectDecideAdmin } from 'store/selectors/user';
import { ActionSetDecideAdmin } from 'store/actions/user';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    },
    '& .input:-internal-autofill-selected': {
      backgroundColor: 'transparent !important'
    }
  },
  newBtn: {
    marginTop: theme.spacing(2)
  },
  input: {
    WebkitBoxShadow: '0 0 0 1000px transparent inset'
  }
}));
const Groups = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [created, setCreated] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [note, setNote] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [adminRole, setAdminRole] = useStoreState(selectDecideAdmin, ActionSetDecideAdmin);

  let [allGroups, setAllGroups] = useState([]);

  useEffect(() => {
    GroupsService.instance.retrieveAll().then(groups => {
      setAllGroups(groups);
      dispatch(setAllGroup(groups));
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateClick = () => {
    setCreated(true);
    const data = {
      name: groupName,
      note: note
    };
    GroupsService.instance.createGroup(data).then(newGroup => {

      allGroups.push(newGroup);
      setAllGroups(allGroups);
      dispatch(setAllGroup(allGroups));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }).catch(error => {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }).finally(
      setOpen(false)
    );
  };

  const classes = useStyles();
  return (
    <div className={classes.root} id="screenshot">
      <PageHeader name="Groups" />
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <SelectionHeader title='Group' align={'left'} />
          <GroupTable />
          {adminRole ? <Button variant="contained" color="primary" className={classes.newBtn} onClick={handleClickOpen}>
            New Group
          </Button> : ''}
        </Grid>
        {adminRole ? <Grid item lg={6} md={6} xl={6} xs={12}>
          <SelectionHeader title='Edit group' align={'left'} />
          <GroupDetail />
        </Grid> : ''}
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please enter your new group info here.
          </DialogContentText>
          <TextField
            error={created && groupName === ''}
            autoFocus
            margin="dense"
            color="secondary"
            id="gname"
            label="Group Name"
            type="text"
            fullWidth
            variant='outlined'
            inputProps={{ className: classes.input }}
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
          <TextField
            error={created && note === ''}
            margin="dense"
            id="note"
            label="Note"
            type="text"
            fullWidth
            variant='outlined'
            inputProps={{ className: classes.input }}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleCreateClick} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {success ? <CustomizedSnackbars variant="success" message="Successfully updated!" /> : ''}
      {error ? <CustomizedSnackbars variant="error" message="Failed" /> : ''}
    </div>
  );
};

export default Groups;
