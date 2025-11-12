import { useMutation } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormCreateCategory, FormEditCategory, PickID } from '@/types/form/category.form';
const CategoryMutation = {
  useCreateCategory() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, FormCreateCategory>({
      mutationFn: (payload) => Api.Category.create(payload),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'category',
        });
        namespace.alert.toast({
          title: 'Berhasil',
          message: 'Berhasil Bikin Category',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Gagal',
          message: 'Gagal Bikin Category',
          icon: 'error',
        });
      },
    });
  },

  useUpdateCategory() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, FormEditCategory>({
      mutationFn: (payload) => Api.Category.update(payload),

      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'category',
        });
        namespace.alert.toast({
          title: 'Berhasil',
          message: 'Berhasil Edit Category',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Gagal',
          message: 'Gagal Update Category',
          icon: 'error',
        });
      },
    });
  },

  useDeleteCategory() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, PickID>({
      mutationFn: (params) => Api.Category.deleteByID(params),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'category',
        });
        namespace.alert.toast({
          title: 'Berhasil',
          message: 'Berhasil Delete Category',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Gagal',
          message: 'Gagal Delete Category',
          icon: 'error',
        });
      },
    });
  },
  useDeleteAll() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, any>({
      mutationFn: () => Api.Category.deleteALl(),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'category',
        });
        namespace.alert.toast({
          title: 'Berhasil',
          message: 'Berhail Delete Semua Category',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Gagal',
          message: 'Gagal Delete Semua Category',
          icon: 'error',
        });
      },
    });
  },
};

export default CategoryMutation;
