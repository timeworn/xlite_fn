import axios from '../../assets/js/axios';

import { CoreService } from './core.service';

export class DevicesService extends CoreService {

  static instance = new DevicesService();

  async retrieveAll() {
    return this.axiosDataResolver(await axios.get(this.configuration.DEVICE_COLLECTION_URL, {}));
  }

  async retrieveGroup(groupId) {
    return this.axiosDataResolver(await axios.get(this.configuration.DEVICE_COLLECTION_URL, { params: { groupId: groupId } }));
  }

  async updateDevice(deviceId, deviceInfo) {
    return this.axiosDataResolver(await axios.put(this.configuration.DEVICE_COLLECTION_URL + '/' + deviceId, deviceInfo));
  }


  axiosDataResolver(axiosData) {
    return new Promise(resolve => resolve(axiosData.data));
  }
}
