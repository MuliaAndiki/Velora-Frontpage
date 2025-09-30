import { useQuery } from '@tanstack/react-query';
import Api from '@/services/props.service';

export function useGetDashboardOverview() {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => Api.Dashboard.getOverview(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useGetDashboardStats(params?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: ['dashboard', 'stats', params],
    queryFn: () => Api.Dashboard.getStats(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useGetCategoryStats(params?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: ['dashboard', 'category-stats', params],
    queryFn: () => Api.Dashboard.getCategoryStats(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useGetGoalsProgress() {
  return useQuery({
    queryKey: ['dashboard', 'goals-progress'],
    queryFn: () => Api.Dashboard.getGoalsProgress(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
