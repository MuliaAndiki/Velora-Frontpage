import { useAlert } from '@/hooks/useAlert/costum-alert';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormCategoryType, FormCategoryUpdateType } from '@/types/form/category.form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateCategory(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, FormCategoryType>({
    mutationFn: (payload: FormCategoryType) => Api.Category.create(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      alert.toast({
        title: 'Success',
        message: 'Category created successfully',
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
        message: 'Failed to create category',
        icon: 'error',
      });
    },
  });
}

export function useUpdateCategory(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, FormCategoryUpdateType>({
    mutationFn: (payload: FormCategoryUpdateType) => Api.Category.update(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      alert.toast({
        title: 'Success',
        message: 'Category updated successfully',
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
        message: 'Failed to update category',
        icon: 'error',
      });
    },
  });
}

export function useDeleteCategory(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation<TResponse<any>, Error, string>({
    mutationFn: (id: string) => Api.Category.delete(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      alert.toast({
        title: 'Success',
        message: 'Category deleted successfully',
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
        message: 'Failed to delete category',
        icon: 'error',
      });
    },
  });
}
