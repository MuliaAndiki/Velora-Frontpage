import { useQuery } from '@tanstack/react-query';
import Api from '@/services/props.service';
import { PickID } from '@/types/form/category.form';

export function useCategoryQueries(params?: PickID) {
  const categoryQuery = useQuery({
    queryKey: ['category'],
    queryFn: () => Api.Category.getAll(),
    staleTime: 1000 * 60 * 5,
  });

  const categoryQueryID = useQuery({
    queryKey: ['category', 'byId', params],
    queryFn: () => Api.Category.getById(params!),
    staleTime: 1000 * 60 * 5,
    enabled: !!params,
  });

  return {
    categoryQuery: categoryQuery.data?.data ?? [],
    categoryQueryID: categoryQueryID.data?.data ?? [],
    isLoading: categoryQuery.isLoading || categoryQueryID.isLoading,
    isError: categoryQuery.isError || categoryQueryID.isError,
    refetchAll: () => {
      categoryQuery.refetch();
      categoryQueryID.refetch();
    },
  };
}
