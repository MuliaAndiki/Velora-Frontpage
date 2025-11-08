import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';
import { PickID } from '@/types/form/category.form';

class CategoryQuery {
  categoryQuery: any;
  categoryQueryID: any;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  refetchAll: () => void;

  constructor({ categoryQuery, categoryQueryID }: Partial<CategoryQuery>) {
    this.categoryQuery = categoryQuery?.data?.data ?? [];
    this.categoryQueryID = categoryQueryID?.data?.data ?? [];
    this.isLoading = categoryQuery?.isLoading || categoryQueryID?.isLoading || false;
    this.isPending = categoryQuery?.isPending || categoryQueryID?.isPending || false;
    this.isError = categoryQuery?.isError || categoryQueryID?.isError || false;
    this.refetchAll = () => {
      categoryQuery?.refetch?.();
      categoryQueryID?.refetch?.();
    };
  }
}

export function useCategoryQueryData() {
  const useAll = () => {
    const categoryQuery = useQuery({
      queryFn: () => Api.Category.getAll(),
      queryKey: ['category'],
      staleTime: 1000 * 60 * 5,
    });
    return new CategoryQuery({ categoryQuery });
  };

  const useId = (params: PickID) => {
    const categoryQueryID = useQuery({
      queryFn: () => Api.Category.getById(params),
      queryKey: ['category', 'byId', params],
      staleTime: 1000 * 60 * 5,
      enabled: !!params,
    });
    return new CategoryQuery({ categoryQueryID });
  };

  return { useAll, useId };
}
