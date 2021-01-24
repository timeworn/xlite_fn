import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getComparator, stableSort } from 'common/util';
import { setSelectedSchedule } from 'store/actions/schedule';


const headCells = [
  { id: 'id', numeric: true, disablePadding: false, label: 'Schedule ID' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'group', numeric: true, disablePadding: false, label: 'Group' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'lastupdated', numeric: true, disablePadding: false, label: 'Last updated' },
  { id: 'action', numeric: true, disablePadding: false, label: 'Action' }
];

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
    width: '100%'
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

export default function ScheduleTable (props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const { data, filterId } = props;

  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState('asc');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, row) => {
    console.log(selected.find(item => item !== row.id.toString()));
    if (event.target.checked || selected.find(item => item !== row.id.toString())) {
      setSelected([].concat(row.id.toString()));
    } else if (event.target.checked && selected.find(item => item !== row.id.toString())) {
      return;
    }
    dispatch(setSelectedSchedule(row));
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

  const handleDetail = () => {
    history.push('/schedules/detail/?id=' + selected);
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
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">{moment(row.last_connected).format('YYYY.MM.DD hh:mm:ss')}</TableCell>
                      <TableCell align="center">
                        <Box display="flex" justifyContent={'center'}>
                          <IconButton aria-label="delete" className={classes.margin}>
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete" className={classes.margin}>
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
      <Box>
        <Button variant="contained" color="primary" onClick={handleDetail}>
          More details
        </Button>
      </Box>
    </div>
  );
}

ScheduleTable.propTypes = {
  data: PropTypes.array.isRequired,
  filterId: PropTypes.string.isRequired
};