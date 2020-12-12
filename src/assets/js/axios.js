import Axios from 'axios';

const axios = Axios.create({
  responseType: 'json'
});
axios.interceptors.request.use(function(config) {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  accessToken && (config.headers.Authorization = `Bearer  ${accessToken}`);
  return config;
});
export default axios;
