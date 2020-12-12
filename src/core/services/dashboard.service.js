import axios from '../../assets/js/axios';

import { CoreService } from './core.service';

export class DashboardService extends CoreService {

  static instance = new DashboardService();

  async getOverview() {
    return this.axiosDataResolver(await axios.get(this.configuration.OVERVIEW_URL, {}));
  }

  axiosDataResolver(axiosData) {
    return new Promise(resolve => resolve(axiosData.data));
  }
}
