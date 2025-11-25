import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCreateReport } from '@/types/form/report.form';
import AxiosClient from '@/utils/axios.client';

class ReportApi {
  async create(payload: FormCreateReport): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/reports', payload);
    return res.data;
  }

  async getAll(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/reports');
    return res.data;
  }

  async getById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/reports/${id}`);
    return res.data;
  }

  async getSummary(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/reports/summary');
    return res.data;
  }

  async delete(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/reports/${id}`);
    return res.data;
  }

  async downloadReport(fileUrl: string): Promise<Blob> {
    const res = await AxiosClient.get(fileUrl, {
      responseType: 'blob',
    });
    return res.data;
  }
}

export default ReportApi;
