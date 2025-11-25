import { useMutation } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormCreateTransaction } from '@/types/form/transaction.form';

const TransactionMutation = {
  useCreate() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, { payload: FormCreateTransaction; id: string }>({
      mutationFn: ({ payload, id }) => Api.Transaction.post(payload, id),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'transaction',
        });
        namespace.alert.toast({
          title: 'succes',
          message: 'succes melakukan transaction',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'failed',
          message: 'failed melakukan transaction',
          icon: 'error',
        });
      },
    });
  },

  useDelete() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, any>({
      mutationFn: () => Api.Transaction.delete(),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'transaction',
        });
        namespace.alert.toast({
          title: 'succes',
          message: 'succes delete all transacntion',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'failed',
          message: 'failed delete all transaction',
          icon: 'error',
        });
      },
    });
  },
  useDeleteById() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, string>({
      mutationFn: (id) => Api.Transaction.deleteById(id),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'transaction',
        });
        namespace.alert.toast({
          title: 'succes',
          message: 'succes delete transaction',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'failed',
          message: 'failed delete transacntion',
          icon: 'error',
        });
      },
    });
  },
  useUpdate() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, { payload: FormCreateTransaction; id: string }>({
      mutationFn: ({ payload, id }) => Api.Transaction.update(payload, id),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'transaction',
        });
        namespace.alert.toast({
          title: 'succes',
          message: 'succes update transaction',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'failed',
          message: 'failed update transacntion',
          icon: 'error',
        });
      },
    });
  },
};

export default TransactionMutation;
