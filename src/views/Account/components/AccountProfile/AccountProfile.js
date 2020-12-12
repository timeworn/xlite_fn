import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Card, CardContent, Divider, Typography } from '@material-ui/core';
import { AuthService } from 'core/services/auth.service';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const [user, setUser] = useState({
    email: '',
    name: '',
    id: '',
    exp: 0,
    iat: 0
  });

  const classes = useStyles();

  useEffect(() => {
    AuthService.instance.getProfile().then(user => setUser(user));
  }, []);
  const avatarSrc = 'https://i.pravatar.cc/150?u=' + user.email;

  // Get timezone
  const currentDate = new Date();
  const timezone = currentDate.getTimezoneOffset() / 60;
  const symbol = timezone > 0 ? '-' : '+';
  const hourValue = Math.abs(timezone) < 10 ? '0' + Math.abs(timezone) : Math.abs(timezone);
  const finalTimezone = 'GMT' + symbol + hourValue;

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} ({finalTimezone})
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={avatarSrc}
          />
        </div>
      </CardContent>
      <Divider/>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
