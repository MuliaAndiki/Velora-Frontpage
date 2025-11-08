import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCreateCategory, FormEditCategory, PickID } from '@/types/form/category.form';
import AxiosClient from '@/utils/axios.client';

class CategoryApi {
  async create(payload: FormCreateCategory): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/category', payload);
    return res.data;
  }
  //  Setup
  async getAll(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/category/');
    return res.data;
  }

  async getById(params: PickID): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/category/${params.id}`);
    return res.data;
  }

  async update(payload: FormEditCategory): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/category/${payload.id}`, payload);
    return res.data;
  }

  async deleteByID(params: PickID): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/category/${params.id}`);
    return res.data;
  }
  async deleteALl(): Promise<TResponse<any>> {
    const res = await AxiosClient.delete('/api/category');
    return res.data;
  }
}

export default new CategoryApi();
