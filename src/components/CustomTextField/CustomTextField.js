import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const CustomTextField = props => {
  const { label, type = '', inputprops = '', disabled, submitted, value = '', onChange } = props;
  const [testFocused, setTestFocused] = useState(false);
  return (
    <TextField
      error={(testFocused || submitted) && value === '' && !disabled}
      label={label}
      type={type}
      InputLabelProps={{
        shrink: true
      }}
      inputProps={{ step: inputprops }}
      variant="outlined"
      value={value}
      size="small"
      disabled={disabled}
      onFocus={() => {
        setTestFocused(true);
      }}
      onChange={(e) => {
        onChange && onChange(e);
      }}
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
