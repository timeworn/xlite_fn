import { DeviceActionTypes } from 'store/actions/device';

const initState = {
  selectedDevice: {
    battery: '',
    event: '',
    gps_fix: 0,
    group: {
      id: 0,
      name: '',
      note: ''
    },
    humidity: '',
    id: 0,
    last_connected: '',
    latitude: '',
    longitude: '',
    name: '',
    serial: '',
    settings: '',
    enable_warning: false,
    status: '',
    temperature: '',
    type: ''
  },
  submitted: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case DeviceActionTypes.SET_SELECTEDDEVICE_INFO:
      return { ...state, selectedDevice: action.device };
    case DeviceActionTypes.SET_SUBMITTED:
      return { ...state, submitted: action.device};
    default:
      return state;
  }
}
