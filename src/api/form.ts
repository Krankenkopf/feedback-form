import { api } from './config';

export const formAPI = {
  async sendFeedback(data: FormData) {
    const response = await api.post(`feedback`, data);
    return { status: response.data.status, message: response.data.message };
  },
};
