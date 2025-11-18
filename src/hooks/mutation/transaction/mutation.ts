import { useMutation } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormCreateTransaction } from '@/types/form/transaction.form';

const TransactionMutation = {
  useCreateExpense() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, { payload: FormCreateTransaction; id: string }>({
      mutationFn: ({ payload, id }) => Api.Transaction.createExpense(payload, id),
      onSuccess: () => {
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
  useCreateIncome() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, FormCreateTransaction>({
      mutationFn: (payload) => Api.Transaction.createIncome(payload),
      onSuccess: () => {
        namespace.alert.toast({
          title: 'succes',
          message: 'succes melakukan transaction',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'error',
          message: 'failed melakukan transcation',
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
          icon: 'success',
        });
      },
    });
  },
};

export default TransactionMutation;
