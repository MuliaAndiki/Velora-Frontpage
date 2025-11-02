import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

class CategoryQuery {
  categoryData: any;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  refetchAll: () => void;
  constructor(categoryQuery: any) {
    this.categoryData = categoryQuery.data.data ?? [];
    this.isLoading = categoryQuery.isLoading;
    this.isPending = categoryQuery.isPending;
    this.isError = categoryQuery.isError;
    this.refetchAll = () => {
      categoryQuery.refetch();
    };
  }
}

export function useCategoryData() {
  const categoryQuery = useQuery({
    queryFn: () => Api.Category.getAll(),
    queryKey: ['category'],
    staleTime: 1000 * 60 * 5,
  });
  return new CategoryQuery(categoryQuery);
}
