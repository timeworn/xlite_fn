import axios from '../../assets/js/axios';

import { CoreService } from './core.service';

export class GroupsService extends CoreService {

  static instance = new GroupsService();

  async retrieveAll() {
    return this.axiosDataResolver(await axios.get(this.configuration.GROUPS_URL, {}));
  }

  async createGroup(data) {
    return this.axiosDataResolver(await axios.post(this.configuration.CREATE_GROUP_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    ));
  }
  async updateGroup(data) {
    return this.axiosDataResolver(await axios.put(this.configuration.GROUPS_URL + '/' + data.id, data));
  }

  async removeGroup(id) {
    return this.axiosDataResolver(await axios.delete(this.configuration.GROUPS_URL + '/' + id));
  }

  axiosDataResolver(axiosData) {
    return new Promise(resolve => resolve(axiosData.data));
  }
}
