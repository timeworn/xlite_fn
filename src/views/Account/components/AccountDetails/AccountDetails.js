import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core';
import { AuthService } from 'core/services/auth.service';
import useStoreState from '../../../../assets/js/use-store-state';
import { currentUser } from 'store/selectors/user';
import { setCurrentUser } from 'store/actions/user';
import CustomizedSnackbars from '../../../../components/SnackbarWrapper/SnackbarWrapper';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const [user, setUser] = useStoreState(currentUser, setCurrentUser);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const classes = useStyles();

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleDetail = () => {
    setBtnClicked(true);
    AuthService.instance.updateProfile({
      email: user.email,
      name: user.name,
      address: user.address
    }).then(updatedUser => {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    })
      .catch(error => {
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
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify your name"
                label="Name"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={user.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={user.email}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={user.address}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider/>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleDetail}
            disabled={btnClicked}
          >
            Save details
          </Button>
        </CardActions>
      </form>
      {success ? <CustomizedSnackbars variant="success" message="Successfully updated!"/> : ''}
      {error ? <CustomizedSnackbars variant="error" message="Failed"/> : ''}
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
