import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';
import { PickID } from '@/types/form/goal.form';

export function useGoalQueries(params?: PickID) {
  const goalQuery = useQuery({
    queryKey: ['goal'],
    queryFn: () => Api.Goal.getAll(),
    staleTime: 1000 * 60 * 5,
  });
  const goalQueryByID = useQuery({
    queryKey: ['goal', 'id'],
    queryFn: () => Api.Goal.getById(params!),
    staleTime: 1000 * 60 * 5,
    enabled: !!params,
  });
  const goalProgress = useQuery({
    queryKey: ['goal', 'progres'],
    queryFn: () => Api.Goal.getProgres(),
    staleTime: 1000 * 60 * 5,
  });
  return {
    goalQuery: goalQuery.data?.data ?? [],
    goalQueryByID: goalQueryByID.data?.data ?? [],
    goalProgress: goalProgress.data?.data ?? [],
    isLoading: goalQuery.isLoading || goalQueryByID.isLoading || goalProgress.isLoading,
    isError: goalQuery.isError || goalQueryByID.isError || goalProgress.isError,
    refetcAll: () => {
      goalProgress.refetch();
      goalQuery.refetch();
      goalQueryByID.refetch();
    },
  };
}
