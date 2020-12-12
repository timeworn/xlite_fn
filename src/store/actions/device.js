export const DeviceActionTypes = {
  SET_SELECTEDDEVICE_INFO: 'SET_SELECTEDDEVICE_INFO',
  SET_SUBMITTED: 'SET_SUBMITTED'
};


export const setSelectedDevice = (device) => ({
  type: DeviceActionTypes.SET_SELECTEDDEVICE_INFO,
  device
});

export const setSubmitted = (device) => ({
  type: DeviceActionTypes.SET_SUBMITTED,
  device
});

