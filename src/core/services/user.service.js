import axios from '../../assets/js/axios';

import { CoreService } from './core.service';

export class UserService extends CoreService {

  static instance = new UserService();

  async retrieveServices() {
    return this.axiosDataResolver(await axios.get(this.configuration.SERVICES_URL, {}));
  }

  axiosDataResolver(axiosData) {
    return new Promise(resolve => resolve(axiosData.data));
  }
}
