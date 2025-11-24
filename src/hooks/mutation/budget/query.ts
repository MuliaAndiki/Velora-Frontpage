import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

export function useBudgetData(id?: string) {
  const getBudgets = useQuery({
    queryKey: ['budgets'],
    queryFn: () => Api.Budget.getAll(),
    staleTime: 1000 * 60 * 5,
  });
  const getBudgetsByID = useQuery({
    queryKey: ['budgets', id],
    queryFn: () => Api.Budget.getAll(),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
  const getBudgetProgres = useQuery({
    queryKey: ['budgets', id],
    queryFn: () => Api.Budget.budgetProses(id!),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
  return {
    getBudgets: getBudgets.data?.data ?? [],
    getBudgetsByID: getBudgetsByID.data?.data ?? '',
    getBudgetProgres: getBudgetProgres.data?.data ?? '',
    isLoading: getBudgets.isLoading || getBudgetsByID.isLoading || getBudgetProgres.isLoading,
    isError: getBudgets.error || getBudgetsByID.error || getBudgetProgres.isLoading,
    refetchAll: () => {
      getBudgets.refetch();
      getBudgetsByID.refetch();
      getBudgetProgres.refetch();
    },
  };
}
