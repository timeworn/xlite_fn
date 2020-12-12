import axios from '../../assets/js/axios';


import { CoreService } from './core.service';
import { BehaviorSubject } from 'rxjs';

export class AuthService extends CoreService {
  static instance = new AuthService();
  isLoggedIn$;

  constructor() {
    super();
    this.isLoggedIn$ = new BehaviorSubject(localStorage.getItem('accessToken') !== null);
  }

  async login(email, password) {
    const authResult = await this.axiosDataResolver(await axios.post(this.configuration.LOGIN_URL, {
      email,
      password
    }));
    if (authResult) {
      this.isLoggedIn$.next(true);
    }
    return authResult;
  }

  async register(name, email, password) {
    const registerResult = await this.axiosDataResolver(await axios.post(this.configuration.REGISTER_URL, {
      name,
      email,
      password
    }));
    if (registerResult) {
      this.isLoggedIn$.next(true);
    }
    return registerResult;
  }

  async getProfile() {
    return this.axiosDataResolver(await axios.get(this.configuration.PROFILE_URL));
  }

  async updateProfile(data) {
    return this.axiosDataResolver(await axios.put(this.configuration.AUTH_URL, data));
  }

  async changePassword(data) {
    return this.axiosDataResolver(await axios.post(this.configuration.CHANGE_PASSWORD__URL, data));
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.isLoggedIn$.next(false);
  }

  axiosDataResolver(axiosData) {
    return new Promise(resolve => resolve(axiosData.data));
  }
}
