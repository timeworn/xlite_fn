import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CustomTextField from '../../../../components/CustomTextField/CustomTextField';
import { selectedDevice } from '../../../../store/selectors/device';
import useStoreState from '../../../../assets/js/use-store-state';
import { setSelectedDevice, setSubmitted } from '../../../../store/actions/device';
import { DevicesService } from '../../../../core/services/devices.service';
import CustomizedSnackbars from '../../../../components/SnackbarWrapper/SnackbarWrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
    width: '70%',
    padding: theme.spacing(1),
    backgroundColor: 'white',
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%'
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
      .then(device => {
        dispatch(setSubmitted(true));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      })
      .catch(error => {
        setError(true);
        setTimeout(() => setError(false), 2000);
      });
    setTimeout(() => setBtnClicked(false), 2000);
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <CustomTextField label="Name" type="string" submitted={btnClicked} value={deviceInfo.name}
                           onChange={handleChange('name')}/>
          <CustomTextField label="Manual Latitude" type="number" inputprops="0.0001" submitted={btnClicked}
                           value={deviceInfo.latitude} onChange={handleChange('latitude')}/>
          <CustomTextField label="Manual Longitude" type="number" inputprops="0.0001" submitted={btnClicked}
                           value={deviceInfo.longitude} onChange={handleChange('longitude')}/>
          <FormControlLabel
            control={
              <Checkbox
                checked={deviceInfo.enable_warning ? deviceInfo.enable_warning : false}
                onChange={handleChange('enable_warning')}
                color="primary"
              />
            }
            label="Enable Warning"
            className={classes.Checkwarning}
          />
          <CustomTextField label="Temperature Low" type="number" inputprops="1" disabled={!deviceInfo.enable_warning}
                           value={warnings.temp_low}
                           submitted={btnClicked} onChange={handleChange('temp_low')}/>
          <CustomTextField label="Temperature High" type="number" inputprops="1" disabled={!deviceInfo.enable_warning}
                           value={warnings.temp_high}
                           submitted={btnClicked} onChange={handleChange('temp_high')}/>
          <CustomTextField label="Humidity Low" type="number" inputprops="1" disabled={!deviceInfo.enable_warning}
                           value={warnings.humi_low}
                           submitted={btnClicked} onChange={handleChange('humi_low')}/>
          <CustomTextField label="Humidity High" type="number" inputprops="1" disabled={!deviceInfo.enable_warning}
                           value={warnings.humi_high}
                           submitted={btnClicked} onChange={handleChange('humi_high')}/>
          <Button variant="contained" color="primary" className={classes.subBtn} disabled={btnClicked}
                  onClick={handleClick}
          >
            Submit
          </Button>
        </div>
      </form>
      {success ? <CustomizedSnackbars variant="success" message="Successfully updated!"/> : ''}
      {error ? <CustomizedSnackbars variant="error" message="Failed"/> : ''}
    </div>
  );
};

export default InfoEnterForm;
