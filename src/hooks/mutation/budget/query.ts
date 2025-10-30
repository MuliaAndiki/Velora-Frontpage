import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

export function useGetBudgets() {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: () => Api.Budget.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useGetBudgetById(id: string) {
  return useQuery({
    queryKey: ['budgets', id],
    queryFn: () => Api.Budget.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
