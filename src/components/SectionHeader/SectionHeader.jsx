import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    marginBottom: theme.spacing(3),
    background: 'transparent',
    '& .MuiCardHeader-action': {
      margin: 0
    },
    '& .MuiCardHeader-content': {
      alignItems: 'center'
    }
  },
  selectEmpty: {
    marginLeft: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
    paddingLeft: theme.spacing(2),
    fontWeight: 400,
    borderRadius: 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1)
    }
  }
}));

const SectionHeader = props => {
  const { className, title, opval, setOpval, optionInfo, ...rest } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    setOpval(event.target.value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title={
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: 24 }}>
          <span>{title}</span>
          {optionInfo &&
          <Select
            value={opval}
            displayEmpty
            name="val"
            className={classes.selectEmpty}
            onChange={handleChange}
          >
            <MenuItem value="">
              {optionInfo.title}
            </MenuItem>
            {optionInfo.options.map((item, key) =>
              (<MenuItem key={key} value={item.name}>{item.name}</MenuItem>)
            )}
          </Select>
          }
        </div>}
      >
      </CardHeader>
    </Card>
  );
};

SectionHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  optionInfo: PropTypes.object,
  opval: PropTypes.string,
  setOpval: PropTypes.func
};

export default SectionHeader;
