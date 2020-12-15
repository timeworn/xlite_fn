import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import CustomizedSnackbars from '../../../../components/SnackbarWrapper/SnackbarWrapper';
import { AuthService } from 'core/services/auth.service';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [btnClicked, setBtnClicked] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [values, setValues] = useState({
    old: '',
    password: '',
    confirm: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handlePassword = () => {
    setBtnClicked(true);
    if (values.password !== values.confirm) {
      setConfirm(true);
      return false;
    }
    AuthService.instance.changePassword({
      oldPassword: values.old,
      newPassword: values.password
    }).then(success => {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }).catch(error => {
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
      <form>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider/>
        <CardContent>
          <TextField
            error={values.old === '' && btnClicked}
            fullWidth
            label="Old Password"
            name="old"
            onChange={handleChange}
            type="password"
            value={values.old}
            variant="outlined"
          />
          <TextField
            error={confirm || (values.password === '' && btnClicked)}
            fullWidth
            label="New Password"
            name="password"
            style={{ marginTop: '1rem' }}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            error={confirm || (values.confirm === '' && btnClicked)}
            fullWidth
            label="Confirm password"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider/>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handlePassword}
            disabled={btnClicked}
          >
            Update
          </Button>
        </CardActions>
      </form>
      {success ? <CustomizedSnackbars variant="success" message="Successfully updated!"/> : ''}
      {error ? <CustomizedSnackbars variant="error" message="Failed"/> : ''}
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
