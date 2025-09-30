import { useAppDispatch } from '@/hooks/dispatch/dispatch';
import { useAlert } from '@/hooks/useAlert/costum-alert';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormRegisterType } from '@/types/form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function useRegister(options?: { onAfterSuccess?: () => void }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const alert = useAlert();
  return useMutation<TResponse<any>, Error, FormRegisterType>({
    mutationFn: (payload: FormRegisterType) => Api.Auth.Register(payload),
    onSuccess: (res) => {
      alert.toast({
        title: 'Succesfully',
        message: 'Register Succesfuly',
        icon: 'success',
        onVoid: () => {
          router.push('/login');
          options?.onAfterSuccess?.();
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Failed',
        message: 'Register Failed',
        icon: 'error',
      });
    },
  });
}
