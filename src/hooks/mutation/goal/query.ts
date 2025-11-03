import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';
import { PickID } from '@/types/form/goal.form';

class GoalQuery {
  GoalData: any;
  GoalDataByID: any;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  refetchAll: () => void;
  constructor(goalQuery: any, goalQueryID: any) {
    this.GoalData = goalQuery.data.data ?? [];
    this.GoalDataByID = goalQueryID.data.data ?? [];
    this.isLoading = goalQuery.isLoading || goalQueryID.isLoading;
    this.isPending = goalQuery.isPending || goalQueryID.isPending;
    this.isError = goalQuery.isError || goalQueryID.isError;
    this.refetchAll = () => {
      goalQuery.refetch();
      goalQueryID.refetch();
    };
  }
}

export function useGoalData(params: PickID) {
  const goalQuery = useQuery({
    queryFn: () => Api.Goal.getAll(),
    queryKey: ['goal'],
    staleTime: 1000 * 60 * 5,
  });

  const goalQueryID = useQuery({
    queryFn: () => Api.Goal.getById(params),
    queryKey: ['goal', 'id'],
    staleTime: 1000 * 60 * 5,
    enabled: !!params,
  });
  return new GoalQuery(goalQuery, goalQueryID);
}
