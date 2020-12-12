import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@material-ui/core';
import moment from 'moment';
import { DevicesService } from '../../core/services/devices.service';
import { useDispatch } from 'react-redux';
import { setSelectedDevice, setSubmitted } from '../../store/actions/device';
import { selectedDevice, submitted } from '../../store/selectors/device';
import useStoreState from '../../assets/js/use-store-state';
import { StatusBullet } from '../index';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'serial', numeric: true, disablePadding: false, label: 'Serial' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'event', numeric: true, disablePadding: false, label: 'Event' },
  { id: 'temperature', numeric: true, disablePadding: false, label: 'Temp' },
  { id: 'humidity', numeric: true, disablePadding: false, label: 'Humidity' },
  { id: 'latitude', numeric: true, disablePadding: false, label: 'Latitude' },
  { id: 'longitude', numeric: true, disablePadding: false, label: 'Longitude' },
  { id: 'lastupdated', numeric: true, disablePadding: false, label: 'Last updated' }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
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

const statusColors = {
  Low: 'info',
  High: 'danger'
};

export default function EnhancedTable(props) {
  const dispatch = useDispatch();
  const { filterId, selectedSerial, setSelectedSerial } = props;
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //update device info
  // const deviceInfo = useSelector(selectedDevice);
  const [deviceInfo, setDeviceInfo] = useStoreState(selectedDevice, setSelectedDevice);
  const [updated, setUpdated] = useStoreState(submitted, setSubmitted);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, row) => {
    setSelected(row.name);
    setSelectedSerial(row.serial);
    dispatch(setSelectedDevice(row));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    DevicesService.instance.retrieveAll().then(devices => setData(devices));
    dispatch(setSelectedDevice([]));
  }, []);

  useEffect(() => {
    data.map(device => {
      if (device.id === deviceInfo.id && updated) {
        device.latitude = deviceInfo.latitude;
        device.longitude = deviceInfo.longitude;
        device.enable_warning = deviceInfo.enable_warning;
        device.settings = deviceInfo.settings;
      }
    });
    dispatch(setSubmitted(false));
  }, [deviceInfo, updated]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setFilteredData(data.filter(item => !filterId || (item.group !== null && item.group.name === filterId)));
  }, [filterId, data]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(filteredData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell align="center">{row.serial}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      {row.event === 'OK' ?
                        <TableCell align="center">{row.event}</TableCell> :
                        <TableCell align="center">
                          <div className={classes.statusContainer}>
                            <StatusBullet className={classes.status}
                                          color={statusColors[row.event.match(/[Temperature|Humidity|Battery] (\w+)/)[1]]}
                                          size="sm"/>
                            {row.event}
                          </div>
                        </TableCell>
                      }
                      <TableCell align="center">{row.temperature}</TableCell>
                      <TableCell align="center">{row.humidity}</TableCell>
                      <TableCell align="center">{parseFloat(row.latitude).toPrecision(7)}</TableCell>
                      <TableCell align="center">{parseFloat(row.longitude).toPrecision(7)}</TableCell>
                      <TableCell align="center">{moment(row.last_connected).format('YYYY.MM.DD hh:mm:ss')}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

EnhancedTable.propTypes = {
  filterId: PropTypes.string.isRequired,
  selectedSerial: PropTypes.string,
  setSelectedSerial: PropTypes.func
};