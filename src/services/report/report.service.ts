import AxiosClient from '@/utils/axios.client';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';

class ReportApi {
  async generateReport(params: {
    startDate: string;
    endDate: string;
    type: 'transactions' | 'budgets' | 'goals';
    format: 'pdf' | 'excel' | 'csv';
  }): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/reports/generate', { params });
    return res.data;
  }

  async downloadReport(fileUrl: string): Promise<Blob> {
    const res = await AxiosClient.get(fileUrl, {
      responseType: 'blob',
    });
    return res.data;
  }
}

export default new ReportApi();
