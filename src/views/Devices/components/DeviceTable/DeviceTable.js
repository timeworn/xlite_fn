import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const DeviceTable = props => {
  const { className, devices, ...rest } = props;

  const classes = useStyles();

  const [selectedDevices, setSelectedDevices] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { devices } = props;

    let selectedDevices;

    if (event.target.checked) {
      selectedDevices = devices.map(device => device.id);
    } else {
      selectedDevices = [];
    }

    setSelectedDevices(selectedDevices);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDevices.indexOf(id);
    let newSelectedDevices = [];

    if (selectedIndex === -1) {
      newSelectedDevices = newSelectedDevices.concat(selectedDevices, id);
    } else if (selectedIndex === 0) {
      newSelectedDevices = newSelectedDevices.concat(selectedDevices.slice(1));
    } else if (selectedIndex === newSelectedDevices.length - 1) {
      newSelectedDevices = newSelectedDevices.concat(selectedDevices.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDevices = newSelectedDevices.concat(
        selectedDevices.slice(0, selectedIndex),
        selectedDevices.slice(selectedIndex + 1)
      );
    }

    setSelectedDevices(newSelectedDevices);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDevices.length === devices.length}
                      color="primary"
                      indeterminate={
                        selectedDevices.length > 0 &&
                        selectedDevices.length < devices.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Serial</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Temperature</TableCell>
                  <TableCell>Humidity</TableCell>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>Last updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.slice(0, rowsPerPage).map(device => (
                  <TableRow className={classes.tableRow} hover key={device.id} selected={selectedDevices.indexOf(device.id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedDevices.indexOf(device.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, device.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{device.id}</TableCell>
                    <TableCell>{device.serial}</TableCell>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>{device.status}</TableCell>
                    <TableCell>{device.event}</TableCell>
                    <TableCell>{device.temperature}</TableCell>
                    <TableCell>{device.humidity}</TableCell>
                    <TableCell>{parseFloat(device.latitude).toPrecision(7)}</TableCell>
                    <TableCell>{parseFloat(device.longitude).toPrecision(7)}</TableCell>
                    <TableCell>
                      {moment(device.lastupdated).format('YYYY.MM.DD hh:mm:ss')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={devices.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

DeviceTable.propTypes = {
  className: PropTypes.string,
  devices: PropTypes.array.isRequired
};

export default DeviceTable;
