import { DeviceActionTypes } from 'store/actions/device';

const initState = {
  selectedDevice: {
    control_mode: '',
    current_dim: '',
    light_sensor: '',
    manual_control: '',
    power: 0,
    event: '',
    group: {
      id: 0,
      name: '',
      note: ''
    },
    id: 0,
    last_connected: '',
    latitude: '',
    longitude: '',
    name: '',
    serial: '',
    settings: '',
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
