import React from 'react';
import PropTypes from "prop-types";
import { TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30
  }
}));
export default function SelectRange(props) {
  const {fromTime, setFromTime, toTime, setToTime} = props;
  const classes = useStyle();
  const handleFromTime = (e) => {
    setFromTime(e.target.value);
  }
  const handleToTime = (e) => {
    setToTime(e.target.value);
  }
  return (
    <div className={classes.root}>
      <div className={classes.fromTime}>
        <Typography variant="h6" className={classes.from}>
          From
        </Typography>
        <TextField
          id="datetime-local"
          type="datetime-local"
          className={classes.textField}
          value={fromTime}
          onChange={handleFromTime}
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
      <div className={classes.toTime}>
        <Typography variant="h6" className={classes.to}>
          To
        </Typography>
        <TextField
          id="datetime-local"
          type="datetime-local"
          className={classes.textField}
          value={toTime}
          onChange={handleToTime}
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
    </div>
  );
}

SelectRange.propTypes = {
  fromTime: PropTypes.string,
  setFromTime: PropTypes.func,
  toTime: PropTypes.string,
  setToTime: PropTypes.func
};