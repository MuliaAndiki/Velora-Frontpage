import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCategoryType, FormCategoryUpdateType } from '@/types/form/category.form';
import AxiosClient from '@/utils/axios.client';

class CategoryApi {
  async getAll(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/categories');
    return res.data;
  }

  async getById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/categories/${id}`);
    return res.data;
  }

  async create(payload: FormCategoryType): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/categories', payload);
    return res.data;
  }

  async update(payload: FormCategoryUpdateType): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/categories/${payload.id}`, payload);
    return res.data;
  }

  async delete(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/categories/${id}`);
    return res.data;
  }
}

export default new CategoryApi();
