import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAlert } from '@/hooks/useAlert/costum-alert';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormBudgetType, FormBudgetUpdateType } from '@/types/form/budget.form';

export function useCreateBudget(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, FormBudgetType>({
    mutationFn: (payload: FormBudgetType) => Api.Budget.create(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      alert.toast({
        title: 'Success',
        message: 'Budget created successfully',
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
        message: 'Failed to create budget',
        icon: 'error',
      });
    },
  });
}

export function useUpdateBudget(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, FormBudgetUpdateType>({
    mutationFn: (payload: FormBudgetUpdateType) => Api.Budget.update(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      alert.toast({
        title: 'Success',
        message: 'Budget updated successfully',
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
        message: 'Failed to update budget',
        icon: 'error',
      });
    },
  });
}

export function useDeleteBudget(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, string>({
    mutationFn: (id: string) => Api.Budget.delete(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      alert.toast({
        title: 'Success',
        message: 'Budget deleted successfully',
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
        message: 'Failed to delete budget',
        icon: 'error',
      });
    },
  });
}
