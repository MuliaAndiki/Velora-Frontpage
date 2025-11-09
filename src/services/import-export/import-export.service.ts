import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import AxiosClient from '@/utils/axios.client';

class ImportExportApi {
  async exportData(params: {
    type: 'all' | 'transactions' | 'budgets' | 'goals' | 'categories';
    format: 'json' | 'csv';
  }): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/io/export', { params });
    return res.data;
  }

  async importData(
    file: File,
    type: 'transactions' | 'budgets' | 'goals' | 'categories'
  ): Promise<TResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const res = await AxiosClient.post('/api/io/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  }

  async downloadExport(fileUrl: string): Promise<Blob> {
    const res = await AxiosClient.get(fileUrl, {
      responseType: 'blob',
    });
    return res.data;
  }
}

export default ImportExportApi;
