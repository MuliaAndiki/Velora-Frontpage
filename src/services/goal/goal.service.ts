import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCreateGoal, FormInsertGoal, PickID } from '@/types/form/goal.form';
import AxiosClient from '@/utils/axios.client';

class GoalApi {
  async getAll(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/goals/');
    return res.data;
  }

  async getById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/goals/${id}`);
    return res.data;
  }

  async getAllProgres(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/goals/progres');
    return res.data;
  }
  async create(payload: FormCreateGoal): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/goals/', payload);
    return res.data;
  }

  async update(payload: FormCreateGoal, params: PickID): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/goals/${params}`, payload);
    return res.data;
  }

  async deleteByID(params: PickID): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/goals/${params}`);
    return res.data;
  }
  async deleteAll(): Promise<TResponse<any>> {
    const res = await AxiosClient.delete('/api/goals/');
    return res.data;
  }
  //blum intergrate
  async insertGoal(payload: FormInsertGoal): Promise<TResponse<any>> {
    const res = await AxiosClient.put('/api/goals', payload);
    return res.data;
  }
}

export default GoalApi;
