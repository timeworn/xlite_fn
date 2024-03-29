import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { StatusBullet } from 'components';
import { timeSince } from 'common/util';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const DeviceEvents = props => {
  const { className, data, filterView, setFilterView, ...rest } = props;
  const classes = useStyles();
  const [direction, setDirection] = useState('desc');
  const [isAsc, setIsAsc] = useState(false);
  const [tableData, setTableData] = useState([]);

  const handleOrder = () => {
    setIsAsc(!isAsc);
    setDirection(isAsc ? 'asc' : 'desc');
  };
  useEffect(() => {
    setTableData(data.sort((a, b) => (a.last_connected < b.last_connected) ? 1 : -1));
  }, [data]);

  useEffect(() => {
    if (isAsc) {
      setTableData(data.sort((a, b) => (a.last_connected > b.last_connected) ? 1 : -1));
    } else {
      setTableData(data.sort((a, b) => (a.last_connected < b.last_connected) ? 1 : -1));
    }
  }, [isAsc]);

  const handleView = () => {
    setFilterView(!filterView);
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Divider/>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Device ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Updated</TableCell>
                  <TableCell sortDirection={direction} onClick={handleOrder}>
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction={direction}>
                        Timestamp
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map(item => (
                  <TableRow hover key={item.id}>
                    <TableCell>{item.serial}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.group.name}</TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet className={classes.status} size="sm"/>
                        {item.event}
                      </div>
                    </TableCell>
                    <TableCell>{timeSince(item.last_connected)} ago</TableCell>
                    <TableCell>{moment(item.last_connected).format('YYYY.MM.DD hh:mm:ss')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider/>
      <CardActions className={classes.actions}>
        <Button color="default" size="small" variant="text" onClick={handleView}>
          {filterView ? "Events Only" : "View all"} <ArrowRightIcon/>
        </Button>
      </CardActions>
    </Card>
  );
};

DeviceEvents.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  filterView: PropTypes.bool,
  setFilterView: PropTypes.func
};
export default DeviceEvents;
