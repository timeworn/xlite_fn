import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const CustomTextField = props => {
  const { label, type = '', inputprops = '', disabled, submitted, value = '', onChange } = props;
  const [testFocused, setTestFocused] = useState(false);
  return (
    <TextField
      disabled={disabled}
      color={'primary'}
      error={(testFocused || submitted) && value === '' && !disabled}
      InputLabelProps={{
        shrink: true
      }}
      inputProps={{ step: inputprops }}
      label={label}
      onChange={(e) => {
        onChange && onChange(e);
      }}
      onFocus={() => {
        setTestFocused(true);
      }}
      size="small"
      type={type}
      value={value}
      variant="outlined"
    />
  );
};
CustomTextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  inputprops: PropTypes.string,
  disabled: PropTypes.bool,
  submitted: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func
};
export default CustomTextField;
