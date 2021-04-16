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
      note: '',
      createdAt: '',
      deletedAt: '',
      updatedAt: ''
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
    type: '',
    manual_dim: 0,
    thingname: ''
  },
  historyData: [],
  currentPos: {},
  submitted: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case DeviceActionTypes.SET_SELECTEDDEVICE_INFO:
      return { ...state, selectedDevice: action.device };
    case DeviceActionTypes.SET_SUBMITTED:
      return { ...state, submitted: action.device };
    case DeviceActionTypes.SET_DEVICEHISTORY:
      return { ...state, deviceHistory: action.device };
    case DeviceActionTypes.SET_CURRENTPOS:
      return { ...state, currentPos: action.device };
    default:
      return state;
  }
}
