import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from '@material-ui/core';
import useStoreState from '../../../../assets/js/use-store-state';
import { selectService } from 'store/selectors/user';
import { UserService } from 'core/services/user.service';
import { ActionSetSelectedService } from 'store/actions/user';
import CustomizedSnackbars from '../../../../components/SnackbarWrapper/SnackbarWrapper';
import UserTable from 'components/UserTable/UserTable';
import ServiceUser from 'components/ServiceUser/ServiceUser';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountManagement = props => {
  const { className, ...rest } = props;

  const [selected, setSelected] = useStoreState(selectService, ActionSetSelectedService);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const classes = useStyles();

  const handleDetail = () => {
    setBtnClicked(true);
    UserService.instance.updateServiceProfile(selected.id, {
      name: selected.name,
      groups: selected.groups.map(item => item.id)
    }).then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      })
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }).finally(
      setTimeout(() => setBtnClicked(false), 2000)
    );
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          title="Users Management"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <UserTable />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <ServiceUser />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleDetail}
            disabled={btnClicked}
          >
            Update
          </Button>
        </CardActions>
      </form>
      {success ? <CustomizedSnackbars variant="success" message="Successfully updated!" /> : ''}
      {error ? <CustomizedSnackbars variant="error" message="Failed" /> : ''}
    </Card>
  );
};

AccountManagement.propTypes = {
  className: PropTypes.string
};

export default AccountManagement;
