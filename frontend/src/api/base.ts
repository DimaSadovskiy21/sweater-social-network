import axios from 'axios';

import { PATH } from './constants';

export const instance = axios.create({
  baseURL: PATH.BASE,
  withCredentials: true,
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    const refreshURL = `${PATH.BASE}${PATH.REFRESH}`;

    if (error.response.status === 401 && error.request.responseURL !== refreshURL) {
      await instance.post(PATH.REFRESH);
      return instance.request(originalRequest);
    }
    throw error;
  },
);
