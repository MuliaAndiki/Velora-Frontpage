import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import { FormCreateWallet } from '@/types/form/wallet.form';
import AxiosClient from '@/utils/axios.client';

class WalletApi {
  async create(payload: FormCreateWallet): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/wallet/', payload);
    return res.data;
  }

  async get(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/wallet');
    return res.data;
  }
}

export default WalletApi;
