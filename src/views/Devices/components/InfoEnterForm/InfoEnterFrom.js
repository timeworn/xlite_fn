import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CustomTextField from '../../../../components/CustomTextField/CustomTextField';
import { selectedDevice } from 'store/selectors/device';
import useStoreState from '../../../../assets/js/use-store-state';
import { setSelectedDevice, setSubmitted } from 'store/actions/device';
import { DevicesService } from 'core/services/devices.service';
import CustomizedSnackbars from '../../../../components/SnackbarWrapper/SnackbarWrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
    width: '70%',
    padding: theme.spacing(1),
    backgroundColor: '#212a37',
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    '& .Mui-disabled': {
      color: '#ffffff33'
    }
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    padding: '8px 24px 8px 8px'
  },
  Checkwarning: {
    marginLeft: 4
  },
  subBtn: {
    marginLeft: theme.spacing(1)
  }
}));

const InfoEnterForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // Get selected device info
  const [deviceInfo, setDeviceInfo] = useStoreState(selectedDevice, setSelectedDevice);
  const [warnings, setWarnings] = useState({});

  useEffect(() => {
    setWarnings(JSON.parse(deviceInfo.settings || '{}'));
  }, [deviceInfo]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (key) => (e) => {
    if (key === 'temp_low' || key === 'temp_high' || key === 'humi_low' || key === 'humi_high') {
      warnings[key] = e.target.value;
      setDeviceInfo({
        ...deviceInfo,
        settings: JSON.stringify(warnings)
      });
    } else if (key === 'enable_warning') {
      setDeviceInfo({
        ...deviceInfo,
        [key]: e.target.checked
      });
    } else {
      setDeviceInfo({
        ...deviceInfo,
        [key]: e.target.value
      });
    }
  };

  const [btnClicked, setBtnClicked] = useState(false);
  const handleClick = () => {
    setDeviceInfo(deviceInfo);
    setBtnClicked(true);
    DevicesService.instance.updateDevice(deviceInfo.id, deviceInfo)
      .then(() => {
        dispatch(setSubmitted(true));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      })
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), 2000);
      });
    setTimeout(() => setBtnClicked(false), 2000);
  };

  return (
    <div className={classes.root}>
      <form
        autoComplete="off"
        className={classes.form}
        noValidate
      >
        <div>
          <CustomTextField
            label="Name"
            onChange={handleChange('name')}
            submitted={btnClicked}
            type="string"
            value={deviceInfo.name}
          />
          <CustomTextField
            inputprops="0.0001"
            label="Manual Latitude"
            onChange={handleChange('latitude')}
            submitted={btnClicked}
            type="number"
            value={deviceInfo.latitude}
          />
          <CustomTextField
            inputprops="0.0001"
            label="Manual Longitude"
            onChange={handleChange('longitude')}
            submitted={btnClicked}
            type="number"
            value={deviceInfo.longitude}
          />
          <FormControlLabel
            className={classes.Checkwarning}
            control={
              <Checkbox
                checked={deviceInfo.enable_warning ? deviceInfo.enable_warning : false}
                color="primary"
                onChange={handleChange('enable_warning')}
              />
            }
            label="Enable Warning"
          />
          <CustomTextField
            disabled={!deviceInfo.enable_warning}
            inputprops="1"
            label="Temperature Low"
            onChange={handleChange('temp_low')}
            submitted={btnClicked}
            type="number"
            value={warnings.temp_low}
          />
          <CustomTextField
            disabled={!deviceInfo.enable_warning}
            inputprops="1"
            label="Temperature High"
            onChange={handleChange('temp_high')}
            submitted={btnClicked}
            type="number"
            value={warnings.temp_high}
          />
          <CustomTextField
            disabled={!deviceInfo.enable_warning}
            inputprops="1"
            label="Humidity Low"
            onChange={handleChange('humi_low')}
            submitted={btnClicked}
            type="number"
            value={warnings.humi_low}
          />
          <CustomTextField
            disabled={!deviceInfo.enable_warning}
            inputprops="1"
            label="Humidity High"
            onChange={handleChange('humi_high')}
            submitted={btnClicked}
            type="number"
            value={warnings.humi_high}
          />
          <Button
            className={classes.subBtn}
            color="primary"
            disabled={btnClicked}
            onClick={handleClick}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
      {success ? <CustomizedSnackbars
        message="Successfully updated!"
        variant="success"
      /> : ''}
      {error ? <CustomizedSnackbars
        message="Failed"
        variant="error"
      /> : ''}
    </div>
  );
};

export default InfoEnterForm;
