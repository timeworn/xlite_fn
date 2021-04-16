import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setSelectedDevice, setSubmitted } from 'store/actions/device';
import { selectedDevice, submitted } from 'store/selectors/device';
import useStoreState from '../../assets/js/use-store-state';
import { StatusBullet } from '../index';
import { getComparator, stableSort } from 'common/util';

const headCells = [
  { id: 'serial', numeric: true, disablePadding: false, label: 'Device ID' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'group', numeric: true, disablePadding: false, label: 'Group' },
  { id: 'event', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'dim', numeric: true, disablePadding: false, label: 'Dim' },
  { id: 'on/off', numeric: true, disablePadding: false, label: 'On/Off' },
  { id: 'mode', numeric: true, disablePadding: false, label: 'Mode' },
  { id: 'lastupdated', numeric: true, disablePadding: false, label: 'Last updated' }
];

function EnhancedTableHead (props) {
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
            inputProps={{ 'aria-label': 'select all devices' }}
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

EnhancedTableHead.propTypes = {
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

export default function EnhancedTable (props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, filterId, selectedSerial, setSelectedSerial } = props;
  const classes = useStyles();
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
    setSelected(row.serial);
    setSelectedSerial(row.serial);
    dispatch(setSelectedDevice(row));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.serial);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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

  const handleDetail = () => {
    history.push('/devices/detail/?id=' + selected);
  };

  useEffect(() => {
    setFilteredData(data.filter(item => !filterId || (item.group !== null && item.group.name === filterId)));
  }, [filterId, data]);

  const isSelected = (serial) => selected.indexOf(serial) !== -1;

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
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(filteredData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.serial);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.serial}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="center">{row.serial}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.group && row.group.name ? row.group.name : ""}</TableCell>
                      {row.event === 'OK' ?
                        <TableCell align="center">{row.event}</TableCell> :
                        <TableCell align="center">
                          <div className={classes.statusContainer}>
                            <StatusBullet className={classes.status} color={row.event.includes("OK") ? "info" : "danger"} size="sm" />
                            {row.event}
                          </div>
                        </TableCell>
                      }
                      <TableCell align="center">{row.current_dim}</TableCell>
                      <TableCell align="center">
                        <Box color={row.status === "ONLINE" ? "#1CC88A" : "#963c3c"}>
                          {row.status}
                        </Box>
                      </TableCell>
                      <TableCell align="center">{row.control_mode}</TableCell>
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
      <Box>
        <Button variant="contained" color="primary" onClick={handleDetail}>
          More details
        </Button>
      </Box>
    </div>
  );
}

EnhancedTable.propTypes = {
  data: PropTypes.array.isRequired,
  filterId: PropTypes.string.isRequired,
  selectedSerial: PropTypes.string,
  setSelectedSerial: PropTypes.func
};