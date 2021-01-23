import axios from '../../assets/js/axios';

import { CoreService } from './core.service';

export class SchedulesService extends CoreService {

  static instance = new SchedulesService();

  async retrieveAll() {
    return this.axiosDataResolver(await axios.get(this.configuration.SCHEDULES_URL, {}));
  }

  async createSchedule(data) {
    return this.axiosDataResolver(await axios.post(this.configuration.GROUPS_URL + '/' + data.group.id + '/schedules', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ));
  }
  async updateSchedule(data) {
    return this.axiosDataResolver(await axios.put(this.configuration.GROUPS_URL + '/' + data.group.id + '/schedules' + data.id, data));
  }

  async removeSchedule(data) {
    return this.axiosDataResolver(await axios.delete(this.configuration.GROUPS_URL + '/' + data.group.id + '/schedules' + data.id));
  }

  axiosDataResolver(axiosData) {
    return new Promise(resolve => resolve(axiosData.data));
  }
}
