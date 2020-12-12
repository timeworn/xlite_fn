import Configuration from './configuration';

export class CoreService {
  configuration;

  constructor() {
    this.configuration = Configuration.instance;
  }
}
