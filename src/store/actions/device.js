export const DeviceActionTypes = {
  SET_SELECTEDDEVICE_INFO: 'SET_SELECTEDDEVICE_INFO',
  SET_SUBMITTED: 'SET_SUBMITTED',
  SET_DEVICEHISTORY: 'SET_DEVICEHISTORY',
  SET_CURRENTPOS: 'SET_CURRENTPOS',
  SET_HISTORY_ITEMS: 'SET_HISTORY_ITEMS'
};


export const setSelectedDevice = (device) => ({
  type: DeviceActionTypes.SET_SELECTEDDEVICE_INFO,
  device
});

export const setSubmitted = (device) => ({
  type: DeviceActionTypes.SET_SUBMITTED,
  device
});

export const setDeviceHistory = (device) => ({
  type: DeviceActionTypes.SET_DEVICEHISTORY,
  device
});

export const setCurrentPos = (device) => ({
  type: DeviceActionTypes.SET_CURRENTPOS,
  device
});

export const setHistoryItems = (device) => ({
  type: DeviceActionTypes.SET_HISTORY_ITEMS,
  device
});

