import { useAlert } from '@/hooks/useAlert/costum-alert';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormLoginType } from '@/types/form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import {
  APP_SESSION_COOKIE_KEY,
  APP_REFRESH_TOKEN_COOKIE_EXPIRES_IN,
} from '@/configs/cookies.config';

export function useLogin(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const router = useRouter();

  return useMutation<TResponse<any>, Error, FormLoginType>({
    mutationFn: (payload: FormLoginType) => Api.Auth.Login(payload),
    onSuccess: (res) => {
      const token = res.data.token;
      setCookie(APP_SESSION_COOKIE_KEY, token, {
        maxAge: APP_REFRESH_TOKEN_COOKIE_EXPIRES_IN / 1000,
        path: '/',
      });

      alert.toast({
        title: 'Success',
        message: 'Login successful',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSuccess?.();
          router.push('/dashboard');
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Failed',
        message: 'Login failed. Please check your credentials.',
        icon: 'error',
      });
    },
  });
}
