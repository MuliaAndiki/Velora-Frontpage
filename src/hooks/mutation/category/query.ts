import { useQuery } from '@tanstack/react-query';
import Api from '@/services/props.service';

export function useGetCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => Api.Category.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useGetCategoryById(id: string) {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => Api.Category.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
