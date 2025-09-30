import { useQuery } from '@tanstack/react-query';
import Api from '@/services/props.service';

export function useGetGoals() {
  return useQuery({
    queryKey: ['goals'],
    queryFn: () => Api.Goal.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useGetGoalById(id: string) {
  return useQuery({
    queryKey: ['goals', id],
    queryFn: () => Api.Goal.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
