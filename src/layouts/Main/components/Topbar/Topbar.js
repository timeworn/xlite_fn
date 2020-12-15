import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Hidden, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import clsx from 'clsx';

import history from '../../../../core/history/history';
import { AuthService } from 'core/services/auth.service';
import { useDispatch } from 'react-redux';
import { ActionSetLoginData } from 'store/actions/user';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  logo: {
    display: 'flex',
    alignItems: 'center'
  },
  logoImg: {
    width: theme.spacing(8),
    height: theme.spacing(6),
    marginRight: theme.spacing(2),
    background: 'transparent'
  },
  title: {
    color: '#546e7a'
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  // const [notifications] = useState([]);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <div className={classes.logo}>
            <img
              alt="Logo"
              className={classes.logoImg}
              src="/images/logos/logo.png"
            />
            <h1 className={classes.title}>Brand</h1>
          </div>
        </RouterLink>
        <div className={classes.flexGrow}/>
        <Hidden mdDown>
          {/*<IconButton color="inherit">*/}
          {/*  <Badge*/}
          {/*    badgeContent={notifications.length}*/}
          {/*    color="primary"*/}
          {/*    variant="dot"*/}
          {/*  >*/}
          {/*    <NotificationsIcon/>*/}
          {/*  </Badge>*/}
          {/*</IconButton>*/}
          <IconButton
            className={classes.signOutButton}
            onClick={() => {
              AuthService.instance.logout();
              dispatch(ActionSetLoginData(null));
              history.push('/');
            }}
          >
            <InputIcon/>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton onClick={onSidebarOpen}>
            <MenuIcon/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
