import { useMutation } from '@tanstack/react-query';
import { deleteCookie, setCookie } from 'cookies-next';

import {
  APP_REFRESH_TOKEN_COOKIE_EXPIRES_IN,
  APP_SESSION_COOKIE_KEY,
} from '@/configs/cookies.config';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { logout, setCurrentUser } from '@/stores/authSlice/authSlice';
import { userSchema } from '@/types/api';
import { MutationOpsiType } from '@/types/app';
import { FormLoginType, FormRegisterType } from '@/types/form';

export function useLogin(options?: MutationOpsiType) {
  const namespace = useAppNameSpase();

  return useMutation<TResponse<any>, Error, FormLoginType>({
    mutationFn: (payload) => Api.Auth.Login(payload),
    onSuccess: (res) => {
      const token = res.data.token;
      setCookie(APP_SESSION_COOKIE_KEY, token, {
        maxAge: APP_REFRESH_TOKEN_COOKIE_EXPIRES_IN / 1000,
        path: '/',
      });
      const payloadUser: userSchema = {
        user: res.data,
      };

      namespace.alert.toast({
        title: 'Berhasil ',
        message: 'Selamat Datang Di Velora',
        icon: 'success',
        onVoid: () => {
          namespace.dispatch(setCurrentUser(payloadUser));
          options!.onAfterSucces?.();
          namespace.router.push('/dashboard');
        },
      });
    },
    onError: (err) => {
      console.error(err);
      namespace.alert.toast({
        title: 'Gagal',
        message: 'Gagal Masuk Ke Velora',
        icon: 'error',
      });
    },
  });
}

export function useRegister(options?: MutationOpsiType) {
  const namespace = useAppNameSpase();
  return useMutation<TResponse<any>, Error, FormRegisterType>({
    mutationFn: (payload) => Api.Auth.Register(payload),
    onSuccess: () => {
      namespace.alert.toast({
        title: 'Berhasil',
        message: 'Selamat Akun Ada Terdaftar',
        icon: 'success',
        onVoid: () => {
          options!.onAfterSucces?.();
          namespace.router.push('/login');
        },
      });
    },
    onError: (err) => {
      console.error(err);
      namespace.alert.toast({
        title: 'Gagal',
        message: 'Gagal Mendaftar KeVelora',
        icon: 'error',
      });
    },
  });
}

export function useLogout(options: MutationOpsiType) {
  const namespace = useAppNameSpase();
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: () => Api.Auth.Logout(),
    onSuccess: () => {
      namespace.alert.toast({
        title: 'Berhasil ',
        message: 'Selamat Kamu Logout',
        icon: 'success',
        onVoid: () => {
          options.onAfterSucces?.();
          namespace.router.push('/login');
          namespace.queryClient.clear();
          namespace.dispatch(logout());
          deleteCookie(APP_SESSION_COOKIE_KEY);
        },
      });
    },
    onError: (err) => {
      console.error(err);
      namespace.alert.toast({
        title: 'Failed',
        message: 'Sesion Failed',
        icon: 'error',
        onVoid: () => {
          deleteCookie(APP_SESSION_COOKIE_KEY);
          namespace.router.push('/login');
          namespace.dispatch(logout());
        },
      });
    },
  });
}
