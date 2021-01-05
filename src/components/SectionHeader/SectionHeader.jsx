import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, CardHeader, MenuItem, Select } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    marginBottom: theme.spacing(3),
    background: 'transparent',
    '& .MuiCardHeader-action': {
      margin: 0
    },
    '& .MuiCardHeader-content': {
      alignItems: 'center',
    }
  },
  selectEmpty: {
    marginLeft: 0,
    backgroundColor: theme.palette.primary.blink,
    paddingLeft: 10,
    fontWeight: 400,
    fontSize: 14,
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
        <Box alignItems={'center'} display={'flex'} fontSize={'24px'} justifyContent={'center'}>
          {title && <span>{title}</span> }
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
        </Box>}
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
