import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none'
  },
  logo: {
    display: 'flex',
    alignItems: 'center'
  },
  logoImg: {
    width: theme.spacing(16),
    height: theme.spacing(6),
    marginRight: theme.spacing(2),
    background: 'transparent'
  },
  title: {
    color: 'white'
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <div className={classes.logo}>
            <img alt="Logo" src="/images/logos/logo.png" width="100px" />
            <h1 className={classes.title}></h1>
          </div>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
