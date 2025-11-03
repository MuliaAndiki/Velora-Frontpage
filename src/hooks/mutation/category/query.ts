import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';
import { PickID } from '@/types/form/category.form';

class CategoryQuery {
  categoryData: any;
  categoryDataByID: any;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  refetchAll: () => void;
  constructor(categoryQuery: any, categoryQueryID: any) {
    this.categoryData = categoryQuery.data.data ?? [];
    this.categoryDataByID = categoryQueryID.data.data ?? [];

    this.isLoading = categoryQuery.isLoading || categoryQueryID.isLoading;
    this.isPending = categoryQuery.isPending || categoryQueryID.isPending;
    this.isError = categoryQuery.isError || categoryQueryID.isError;
    this.refetchAll = () => {
      categoryQuery.refetch();
      categoryQueryID.refetch();
    };
  }
}

export function useCategoryData(params: PickID) {
  const categoryQuery = useQuery({
    queryFn: () => Api.Category.getAll(),
    queryKey: ['category'],
    staleTime: 1000 * 60 * 5,
  });
  const categoryQueryID = useQuery({
    queryFn: () => Api.Category.getById(params),
    queryKey: ['category', 'Id'],
    staleTime: 1000 * 60 * 5,
    enabled: !!params,
  });
  return new CategoryQuery(categoryQuery, categoryQueryID);
}
