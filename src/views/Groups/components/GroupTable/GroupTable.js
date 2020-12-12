import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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

const GroupTable = props => {
  const { className, groups, ...rest } = props;

  const classes = useStyles();

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { groups } = props;

    let selectedGroups;

    if (event.target.checked) {
      selectedGroups = groups.map(device => device.id);
    } else {
      selectedGroups = [];
    }

    setSelectedGroups(selectedGroups);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedGroups.indexOf(id);
    let newSelectedGroups = [];

    if (selectedIndex === -1) {
      newSelectedGroups = newSelectedGroups.concat(selectedGroups, id);
    } else if (selectedIndex === 0) {
      newSelectedGroups = newSelectedGroups.concat(selectedGroups.slice(1));
    } else if (selectedIndex === newSelectedGroups.length - 1) {
      newSelectedGroups = newSelectedGroups.concat(selectedGroups.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedGroups = newSelectedGroups.concat(
        selectedGroups.slice(0, selectedIndex),
        selectedGroups.slice(selectedIndex + 1)
      );
    }

    setSelectedGroups(newSelectedGroups);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedGroups.length === groups.length}
                      color="primary"
                      indeterminate={
                        selectedGroups.length > 0 &&
                        selectedGroups.length < groups.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Group Name</TableCell>
                  <TableCell>Number of devices</TableCell>
                  <TableCell>Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.slice(0, rowsPerPage).map(group => (
                  <TableRow className={classes.tableRow} hover key={group.id} selected={selectedGroups.indexOf(group.id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedGroups.indexOf(group.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, group.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{group.num}</TableCell>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>{group.devices.length}</TableCell>
                    <TableCell>{group.note}</TableCell>
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
          count={groups.length}
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

GroupTable.propTypes = {
  className: PropTypes.string,
  groups: PropTypes.array.isRequired
};

export default GroupTable;
