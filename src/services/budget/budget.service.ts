import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormBudgetType, FormBudgetUpdateType } from '@/types/form/budget.form';
import AxiosClient from '@/utils/axios.client';

class BudgetApi {
  async getAll(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/budgets');
    return res.data;
  }

  async getById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/budgets/${id}`);
    return res.data;
  }

  async create(payload: FormBudgetType): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/budgets', payload);
    return res.data;
  }

  async update(payload: FormBudgetUpdateType): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/budgets/${payload.id}`, payload);
    return res.data;
  }

  async delete(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/budgets/${id}`);
    return res.data;
  }
}

export default new BudgetApi();
