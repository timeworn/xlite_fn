import axios from '../../assets/js/axios';

import { CoreService } from './core.service';

export class OrganizationsService extends CoreService {

  static instance = new OrganizationsService();

  async retriveInfo() {
    return this.axiosDataResolver(await axios.get(this.configuration.ORGANIZATIONS_URL + '/adminOrgInfo', {}));
  }

  axiosDataResolver(axiosData) {
    return new Promise(resolve => resolve(axiosData.data));
  }
}
