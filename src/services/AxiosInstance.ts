import axios, { AxiosInstance } from 'axios';


class AxiosService {
  axiosInstance!:AxiosInstance;

  constructor() {
    this.initInstance();
  }

  initInstance() {
    this.axiosInstance = axios.create({
      baseURL: '/api',
      timeout: 5000
    });
  }

  get pbAxios() {
    return this.axiosInstance;
  }
}

export default new AxiosService();