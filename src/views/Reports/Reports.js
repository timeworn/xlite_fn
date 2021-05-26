import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import uuid from 'uuid/v1';
import * as moment from 'moment';
import useStoreState from 'assets/js/use-store-state';
import { currentUser } from 'store/selectors/user';
import { setCurrentUser } from 'store/actions/user';
import { makeStyles } from '@material-ui/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, Grid, MenuItem, Select } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { GetApp } from '@material-ui/icons';
import PageHeader from '../../layouts/Main/components/PageHeader/PageHeader';
import SelectionHeader from '../../components/SectionHeader/SectionHeader';
import SelectRange from '../Devices/components/SelectRange/SelectRange';
import { DevicesService } from '../../core/services/devices.service';
import { reportUrl } from '../Devices/data';
import CustomizedSnackbars from '../../components/SnackbarWrapper/SnackbarWrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  sectionHeader: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  halfPage: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  selectEmpty: {
    width: '80%',
    height: '50%',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  timeSep: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop: 3
  },
  generateBtn: {
    marginTop: theme.spacing(2)
  },
  genText: {
    marginTop: theme.spacing(1)
  }
}));
const frequency = [
  {
    id: uuid(),
    option: '1hr',
    value: '1h'
  },
  {
    id: uuid(),
    option: '6hr',
    value: '6h'
  },
  {
    id: uuid(),
    option: '12hr',
    value: '12h'
  },
  {
    id: uuid(),
    option: '1day',
    value: '24h'
  }
];
const Reports = () => {
  const classes = useStyles();
  const currentDate = new Date();
  const timezone = new Date().getTimezoneOffset() / 60;
  const symbol = timezone > 0 ? '-' : '+';
  const hourValue = Math.abs(timezone) < 10 ? '0' + Math.abs(timezone) : Math.abs(timezone);
  const finalTimezone = symbol + hourValue + ':00';

  const [user, setUser] = useStoreState(currentUser, setCurrentUser);
  const [open, setOpen] = useState(false);
  const [resultUrl, setResultUrl] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [data, setData] = useState([]);
  const [deviceVal, setDeviceVal] = useState('');
  let [fromTime, setFromTime] = useState(moment(new Date(currentDate.getTime() - 60 * 60 * 1000)).format('YYYY-MM-DD\\THH:mm'));
  const [toTime, setToTime] = useState(moment(currentDate).format('YYYY-MM-DD\\THH:mm'));
  const [freqVal, setFreqVal] = useState('');
  const [checkedWarning, setCheckedWarning] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [gettingInfo, setGettingInfo] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDownload = () => {
    setTimeout(() => {
      const response = {
        file: resultUrl
      };
      window.open(response.file);
    }, 100);
    setOpen(false);
  };

  const handleDeviceChange = (event) => {
    setDeviceVal(event.target.value);
  };

  const handleFreqChange = (event) => {
    setFreqVal(event.target.value);
  };

  const handelChange = () => {
    setCheckedWarning(!checkedWarning);
  };

  const handleGenerate = () => {
    setGenerated(true);
    if (deviceVal && freqVal) {
      setGettingInfo(true);
      fetch(reportUrl, {
        method: 'post',
        body: JSON.stringify({
          query: {
            history: {
              dev_serial: deviceVal,
              time_from: fromTime + finalTimezone,
              time_to: toTime + finalTimezone,
              interval: freqVal,
              warning_only: checkedWarning ? 1 : 0
            },
            api_key: user.api_key ? user.api_key : ''
          }
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((data) => data.json())
        .then(data => {
          if (data.status === 'success') {
            setResultUrl(data.url);
            setOpen(true);
          } else if (data.status === 'failed') {
            setError(true);
            setErrorText(data.reason);
            setTimeout(() => setError(false), 2000);
          }
          setGettingInfo(false);
          // if (data.length !== 0) {
          //   exportPdf();
          // }
        });
    }
  };

  function exportPdf () {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'landscape'; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = 'Device Report';
    const headers = [['Serial', 'Type', 'Time', 'Temperature', 'Humidity', 'Battery', 'Lat', 'Lon']];

    const data = historyData.map(elt => [elt.serial, elt.type, elt.timestamp, elt.sensor.temperature, elt.sensor.humidity, elt.battery, elt.location.lat, elt.location.lon]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('report.pdf');
  }

  useEffect(() => {
    DevicesService.instance.retrieveAll().then(devices => setData(devices));
  }, []);

  return (
    <div className={classes.root} id="screenshot">
      <PageHeader name="Reports" className={classes.pageHeader} />
      <SelectionHeader title='Generate reports' className={classes.sectionHeader} align={'left'} />
      <div className={classes.halfPage}>
        <Grid container>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Typography variant="h5">
              Select device
            </Typography>
            <Select
              error={deviceVal === '' && generated}
              displayEmpty
              name="val"
              className={classes.selectEmpty}
              variant="outlined"
              size="small"
              value={deviceVal}
              onChange={handleDeviceChange}
            >
              <MenuItem value="">Select Device</MenuItem>
              {data.map((item, key) =>
                (<MenuItem key={key} value={item.serial}>{item.name}</MenuItem>)
              )}
            </Select>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Typography variant="h5">
              Select Frequency
            </Typography>
            <Select
              error={freqVal === '' && generated}
              displayEmpty
              name="val"
              className={classes.selectEmpty}
              variant="outlined"
              size="small"
              value={freqVal}
              onChange={handleFreqChange}
            >
              <MenuItem value="">Select frequency</MenuItem>
              {frequency.map((item, key) =>
                (<MenuItem key={key} value={item.value}>{item.option}</MenuItem>)
              )}
            </Select>
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <SelectRange fromTime={fromTime} setFromTime={setFromTime} toTime={toTime} setToTime={setToTime} />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedWarning}
                  onChange={handelChange}
                  value="checkedWarning"
                  color="secondary"
                />
              }
              label="only show warning?"
              className={classes.Checkwarning}
            />
          </Grid>
        </Grid>
        <Grid item lg={3} md={3} xl={6} xs={12}>
          <Button variant="contained" color="primary" className={classes.generateBtn} onClick={handleGenerate}
            disabled={gettingInfo}>
            Generate
          </Button>
          {historyData.length !== 0 ?
            <Typography className={classes.genText}>{historyData.length} rows generated</Typography> : ''}
        </Grid>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
            File is ready for download
          </DialogContentText>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClick={handleDownload}
          >
            <GetApp /> Download now
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined" size="small">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {error ? <CustomizedSnackbars variant="error" message={errorText} /> : ''}
    </div>
  );
};

export default Reports;
