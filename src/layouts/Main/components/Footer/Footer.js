import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Link, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    overflow: 'visible',
    display: 'none'
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        {' '} Copyright @ {' '}
        <Link
          component="a"
          href="/"
          target="_blank"
        >
          Brand
        </Link>
        . 2019
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
