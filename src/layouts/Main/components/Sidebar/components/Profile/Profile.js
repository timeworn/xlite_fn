import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { AuthService } from 'core/services/auth.service';
import useStoreState from '../../../../../../assets/js/use-store-state';
import { currentUser } from 'store/selectors/user';
import { setCurrentUser } from 'store/actions/user';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const [user, setUser] = useStoreState(currentUser, setCurrentUser);
  const [avatarSrc, setAvatarSrc] = useState('');

  useEffect(() => {
    AuthService.instance.getProfile().then(user => setUser(user));
  }, []);

  const classes = useStyles();

  useEffect(() => {
    setAvatarSrc('https://i.pravatar.cc/150?u=' + user.email);
  }, [user.email]);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={avatarSrc}
        to="/account"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">Brain Director</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
