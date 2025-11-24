import { useMutation } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormCreateBudget } from '@/types/form/budget.form';

const BudgetMutation = {
  useCreateBudget() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, FormCreateBudget>({
      mutationFn: (payload: FormCreateBudget) => Api.Budget.create(payload),
      onSuccess: (res) => {
        namespace.queryClient.invalidateQueries({ queryKey: ['budgets'] });
        namespace.alert.toast({
          title: 'Success',
          message: 'Budget created successfully',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Failed',
          message: 'Failed to create budget',
          icon: 'error',
        });
      },
    });
  },
  useUpdateBudget() {
    const namespace = useAppNameSpase();

    return useMutation<TResponse<any>, Error, { payload: FormCreateBudget; id: string }>({
      mutationFn: ({ id, payload }) => Api.Budget.update(payload, id),
      onSuccess: (res) => {
        namespace.queryClient.invalidateQueries({ queryKey: ['budgets'] });
        namespace.alert.toast({
          title: 'Success',
          message: 'Budget updated successfully',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Failed',
          message: 'Failed to update budget',
          icon: 'error',
        });
      },
    });
  },
  useDeleteBudget() {
    const namespace = useAppNameSpase();

    return useMutation<TResponse<any>, Error, string>({
      mutationFn: (id: string) => Api.Budget.delete(id),
      onSuccess: (res) => {
        namespace.queryClient.invalidateQueries({ queryKey: ['budgets'] });
        namespace.alert.toast({
          title: 'Success',
          message: 'Budget deleted successfully',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Failed',
          message: 'Failed to delete budget',
          icon: 'error',
        });
      },
    });
  },
};

export default BudgetMutation;
