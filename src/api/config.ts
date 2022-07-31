import axios from 'axios';

import errorJson from './__mock__/error.json';
import successJson from './__mock__/success.json';

export const api = axios.create({
  baseURL: 'https://google.com/',
});

api.interceptors.response.use(
  res => res,
  async _ =>
    new Promise((res, rej) => {
      setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
          res({ status: 200, data: successJson });
        }
        rej(errorJson);
      }, 1000);
    }),
);
