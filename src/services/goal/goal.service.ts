import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormGoalType, FormGoalUpdateType } from '@/types/form/goal.form';
import AxiosClient from '@/utils/axios.client';

class GoalApi {
  async getAll(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/goals');
    return res.data;
  }

  async getById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/goals/${id}`);
    return res.data;
  }

  async create(payload: FormGoalType): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/goals', payload);
    return res.data;
  }

  async update(payload: FormGoalUpdateType): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/goals/${payload.id}`, payload);
    return res.data;
  }

  async delete(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/goals/${id}`);
    return res.data;
  }
}

export default new GoalApi();
