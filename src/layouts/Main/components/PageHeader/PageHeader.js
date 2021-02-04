import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    marginBottom: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  }
}));

const PageHeader = props => {
  const { name } = props;
  const classes = useStyles();
  return (
    <div className={classes.top}>
      <Typography variant="h1" component="h2">{name}</Typography>
    </div>
  );
};

PageHeader.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default PageHeader;
