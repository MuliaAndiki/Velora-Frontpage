import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCreateTransaction } from '@/types/form/transaction.form';
import AxiosClient from '@/utils/axios.client';

class TransactionApi {
  async createExpense(payload: FormCreateTransaction, categoryId: string): Promise<TResponse<any>> {
    const res = await AxiosClient.post(`/api/transaction/${categoryId}`, payload);
    return res.data;
  }
  async createIncome(payload: FormCreateTransaction): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/transaction', payload);
    return res.data;
  }
  async get(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/transaction');
    return res.data;
  }
  async getById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/transaction/${id}`);
    return res.data;
  }
  async delete(): Promise<TResponse<any>> {
    const res = await AxiosClient.delete('/api/transaction');
    return res.data;
  }
  async deleteById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/transaction/${id}`);
    return res.data;
  }
  async update(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/transaction/${id}`);
    return res.data;
  }
}

export default TransactionApi;
