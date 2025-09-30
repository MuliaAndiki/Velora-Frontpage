import AxiosClient from '@/utils/axios.client';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';

class DashboardApi {
  async getOverview(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/dashboard/overview');
    return res.data;
  }

  async getStats(params?: { startDate?: string; endDate?: string }): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/dashboard/stats', { params });
    return res.data;
  }

  async getCategoryStats(params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/dashboard/category-stats', { params });
    return res.data;
  }

  async getGoalsProgress(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/dashboard/goals-progress');
    return res.data;
  }
}

export default new DashboardApi();
