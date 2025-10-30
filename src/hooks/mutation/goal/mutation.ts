import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAlert } from '@/hooks/useAlert/costum-alert';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormGoalType, FormGoalUpdateType } from '@/types/form/goal.form';

export function useCreateGoal(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, FormGoalType>({
    mutationFn: (payload: FormGoalType) => Api.Goal.create(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      alert.toast({
        title: 'Success',
        message: 'Goal created successfully',
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
        message: 'Failed to create goal',
        icon: 'error',
      });
    },
  });
}

export function useUpdateGoal(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, FormGoalUpdateType>({
    mutationFn: (payload: FormGoalUpdateType) => Api.Goal.update(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      alert.toast({
        title: 'Success',
        message: 'Goal updated successfully',
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
        message: 'Failed to update goal',
        icon: 'error',
      });
    },
  });
}

export function useDeleteGoal(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, string>({
    mutationFn: (id: string) => Api.Goal.delete(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      alert.toast({
        title: 'Success',
        message: 'Goal deleted successfully',
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
        message: 'Failed to delete goal',
        icon: 'error',
      });
    },
  });
}
