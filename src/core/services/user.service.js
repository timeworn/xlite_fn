import axios from '../../assets/js/axios';

import { CoreService } from './core.service';

export class UserService extends CoreService {

  static instance = new UserService();

  async retrieveServices () {
    return this.axiosDataResolver(await axios.get(this.configuration.SERVICES_URL + '/services', {}));
  }

  async updateServiceProfile (serviceId, data) {
    return this.axiosDataResolver(await axios.post(this.configuration.SERVICES_URL + '/' + serviceId + '/groups', data));
  }

  async removeService(id) {
    return this.axiosDataResolver(await axios.delete(this.configuration.SERVICES_URL + '/' + id));
  }

  async retrieveUserGroups () {
    return this.axiosDataResolver(await axios.get(this.configuration.USERGROUPS_URL, {}));
  }

  async retrieveDeviceGroups (id) {
    return this.axiosDataResolver(await axios.get(this.configuration.SERVICES_URL + '/' + id + '/groups', {}));
  }

  axiosDataResolver (axiosData) {
    return new Promise(resolve => resolve(axiosData.data));
  }
}
