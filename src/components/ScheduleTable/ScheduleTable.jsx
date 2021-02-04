import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getComparator, makeName, stableSort } from 'common/util';
import { setSelectedSchedule } from 'store/actions/schedule';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { SchedulesService } from 'core/services/schedules.service';
import CustomizedSnackbars from 'components/SnackbarWrapper/SnackbarWrapper';
import useStoreState from 'assets/js/use-store-state';
import { selectedSchedule } from 'store/selectors/schedule';


const headCells = [
  { id: 'id', numeric: true, disablePadding: false, label: 'Schedule ID' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'group', numeric: true, disablePadding: false, label: 'Group' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'lastupdated', numeric: true, disablePadding: false, label: 'Last updated' },
  { id: 'action', numeric: true, disablePadding: false, label: 'Action' }
];

const defaultScheduleInfo = {
  id: null,
  name: '',
  status: 'ACTIVE',
  schedule: '',
  last_updated: '2020-12-06 14:32:25',
  group: {}
};

function ScheduleTableHead (props) {
  const { classes, order, orderBy, numSelected, rowCount, onSelectAllClick, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all schedules' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ScheduleTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiIconButton-root': {
      color: 'white'
    }
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  }
}));

export default function ScheduleTable () {

  const history = useHistory();
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useStoreState(selectedSchedule, setSelectedSchedule);
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [duplicatedEnable, setDuplicatedEnable] = useState(false);
  const [selectedRowSchedule, setSelectedRowSchedule] = useState({});

  useEffect(() => {
    SchedulesService.instance.retrieveAll().then(schedules => setData(schedules));
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, row) => {
    if (event.target.checked || selected.find(item => item !== row.id.toString())) {
      setSelected([].concat(row.id.toString()));
      const filterInfo = data.filter(one => one.id === row.id);
      setSelectedRowSchedule(filterInfo[0]);
    } else if (event.target.checked && selected.find(item => item !== row.id.toString())) {
      return false;
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(data.map(item => item.id));
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    setOpen(true);
    setDelId(id);
  };

  const handleEdit = (id) => {
    history.push('/schedules/detail/?id=' + id);
  };

  const handleCreate = () => {
    setCurrentSchedule(defaultScheduleInfo);
    history.push('/schedules/create');
  };

  const handleDuplicate = () => {
    if (!selected.length) {
      setDuplicatedEnable(true);
      setTimeout(() => setDuplicatedEnable(false), 2000);
    } else {
      let newDuplicatedInfo = Object.assign({}, selectedRowSchedule);
      newDuplicatedInfo.id = null;
      newDuplicatedInfo.name = makeName(5);
      SchedulesService.instance.createSchedule(newDuplicatedInfo).then(createdData => {
        setData(data.concat(createdData));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }).catch(() => {
        setError(true);
        setTimeout(() => setError(false), 2000);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinalDelete = () => {
    setData(data.filter(item => item.id !== delId));
    const info = data.filter(item => item.id === delId);
    SchedulesService.instance.removeSchedule(info[0]).then(() => {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }).catch(() => {
      setError(true);
      setTimeout(() => setError(false), 2000);
    });
    handleClose();
  };

  const isSelected = (id) => selected.indexOf(id.toString()) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <ScheduleTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `schedule-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.group.name}</TableCell>
                      <TableCell align="center">{row.status ? row.status : "INACTIVE"}</TableCell>
                      <TableCell align="center">{moment(row.last_connected).format('YYYY.MM.DD hh:mm:ss')}</TableCell>
                      <TableCell align="center">
                        <Box display="flex" justifyContent={'center'}>
                          <IconButton aria-label="delete" className={classes.margin} onClick={() => handleEdit(row.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete" className={classes.margin} onClick={() => handleDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Box display={'flex'}>
        <Box mr={'20px'}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            New
          </Button>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleDuplicate}>
            Duplicate
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm dialog'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want really to delete schedule #{delId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant={'contained'}>
            Disagree
          </Button>
          <Button onClick={handleFinalDelete} color="primary" variant={'contained'} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {duplicatedEnable ? <CustomizedSnackbars variant="error" message="First of all, please select row that you are going to duplicate." /> : ''}
      {success ? <CustomizedSnackbars variant="success" message="Successfully updated!" /> : ''}
      {error ? <CustomizedSnackbars variant="error" message="Failed" /> : ''}
    </div>
  );
}