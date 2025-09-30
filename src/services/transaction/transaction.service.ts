import AxiosClient from '@/utils/axios.client';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormTransactionType, FormTransactionUpdateType } from '@/types/form/transaction.form';

class TransactionApi {
  async getAll(params?: {
    startDate?: string;
    endDate?: string;
    categoryId?: string;
  }): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/transactions', { params });
    return res.data;
  }

  async getById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/transactions/${id}`);
    return res.data;
  }

  async create(payload: FormTransactionType): Promise<TResponse<any>> {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value !== undefined) {
        formData.append(key, value);
      }
    });

    const res = await AxiosClient.post('/api/transactions', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  }

  async update(payload: FormTransactionUpdateType): Promise<TResponse<any>> {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value !== undefined) {
        formData.append(key, value);
      }
    });

    const res = await AxiosClient.put(`/api/transactions/${payload.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  }

  async delete(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/transactions/${id}`);
    return res.data;
  }
}

export default new TransactionApi();
