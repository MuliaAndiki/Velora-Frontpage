import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAlert } from '@/hooks/useAlert/costum-alert';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormTransactionType, FormTransactionUpdateType } from '@/types/form/transaction.form';

export function useCreateTransaction(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, FormTransactionType>({
    mutationFn: (payload: FormTransactionType) => Api.Transaction.create(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] }); // Invalidate dashboard data as well
      alert.toast({
        title: 'Success',
        message: 'Transaction created successfully',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSuccess?.();
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Failed',
        message: 'Failed to create transaction',
        icon: 'error',
      });
    },
  });
}

export function useUpdateTransaction(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, FormTransactionUpdateType>({
    mutationFn: (payload: FormTransactionUpdateType) => Api.Transaction.update(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      alert.toast({
        title: 'Success',
        message: 'Transaction updated successfully',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSuccess?.();
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Failed',
        message: 'Failed to update transaction',
        icon: 'error',
      });
    },
  });
}

export function useDeleteTransaction(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, string>({
    mutationFn: (id: string) => Api.Transaction.delete(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      alert.toast({
        title: 'Success',
        message: 'Transaction deleted successfully',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSuccess?.();
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Failed',
        message: 'Failed to delete transaction',
        icon: 'error',
      });
    },
  });
}
