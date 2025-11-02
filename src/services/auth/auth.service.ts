import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import {
  FormForgotPassword,
  FormLogin,
  FormRegister,
  FormSendOtp,
  FormVerifyOtp,
} from '@/types/form/auth.form';
import AxiosClient from '@/utils/axios.client';

class AuthApi {
  async Login(payload: FormLogin): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/login', payload);
    return res.data;
  }
  async Register(payload: FormRegister): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/register', payload);
    return res.data;
  }
  async Logout(): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/logout');
    return res.data;
  }

  async ForgotPassword(payload: FormForgotPassword): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/forgot', payload);
    return res.data;
  }

  async SendOtp(payload: FormSendOtp): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/send-otp', payload);
    return res.data;
  }
  async Verify(payload: FormVerifyOtp): Promise<TResponse<any>> {
    const res = await AxiosClient.post('/api/auth/verify', payload);
    return res.data;
  }
  // Setup Endpoint
  async GetProfile(): Promise<TResponse<any>> {
    const res = await AxiosClient.get('/api/auth/profile');
    return res.data;
  }
}

export default new AuthApi();
