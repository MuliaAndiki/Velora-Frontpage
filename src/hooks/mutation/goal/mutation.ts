import { useMutation } from '@tanstack/react-query';
import { use } from 'react';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormCreateGoal, FormInsertGoal, PickID } from '@/types/form/goal.form';

const GoalMutation = {
  useCreate() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, FormCreateGoal>({
      mutationFn: (payload) => Api.Goal.create(payload),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'goal',
        });
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'wallet',
        });
        namespace.alert.toast({
          title: 'Berhasil',
          message: 'Tabungan Berhasil Terbuat',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Gagal',
          message: 'Tabungan Gagal Terbuat',
          icon: 'error',
        });
      },
    });
  },

  useUpdate() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, { params: PickID; payload: FormCreateGoal }>({
      mutationFn: ({ params, payload }) => Api.Goal.update(payload, params),

      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'goal',
        });
        namespace.alert.toast({
          title: 'Berhasil',
          message: 'Goal Berhasil TerUpdate',
          icon: 'success',
        });
      },
      onError: (err) => {
        namespace.alert.toast({
          title: 'Gagal',
          message: 'Goal Gagal TerUpdate',
          icon: 'error',
          onVoid: () => {
            console.error(err);
          },
        });
      },
    });
  },
  useDeleteALl() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, any>({
      mutationFn: () => Api.Goal.deleteAll(),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'goal',
        });
        namespace.alert.toast({
          title: 'Berhasil',
          message: 'Goal Berhasil DiDelete',
          icon: 'success',
        });
      },
      onError: (err) => {
        namespace.alert.toast({
          title: 'Gagal',
          message: 'Goal Gagal DiDelete',
          icon: 'error',
          onVoid: () => {
            console.error(err);
          },
        });
      },
    });
  },
  useDeleteByID() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, any>({
      mutationFn: (params) => Api.Goal.deleteByID(params),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'goal',
        });
        namespace.alert.toast({
          title: 'Berhasil',
          message: 'Goal Berhasil DiDelete',
          icon: 'success',
        });
      },
      onError: (err) => {
        namespace.alert.toast({
          title: 'Gagal',
          message: 'Goal Gagal DiDelete',
          icon: 'error',
          onVoid: () => {
            console.error(err);
          },
        });
      },
    });
  },
  useInsertGoal() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, FormInsertGoal>({
      mutationFn: (payload) => Api.Goal.insertGoal(payload),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'goal',
        });
        namespace.alert.toast({
          title: 'successfully',
          message: 'successfully insert goal',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Gagal',
          message: 'Goal Gagal di insert',
          icon: 'error',
        });
      },
    });
  },
};

export default GoalMutation;
