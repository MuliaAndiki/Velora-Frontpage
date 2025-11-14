import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

export function useTransactionQueries(id?: string) {
  const transactionQuery = useQuery({
    queryKey: ['transaction'],
    queryFn: () => Api.Transaction.get(),
    staleTime: 1000 * 60 * 5,
  });
  const transactionQueryById = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => Api.Transaction.getById(id!),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
  return {
    transactionQuery: transactionQuery.data?.data ?? [],
    transactionQueryById: transactionQueryById.data?.data ?? '',
    isLoading: transactionQuery.isLoading || transactionQueryById.isLoading,
    isError: transactionQuery.isError || transactionQuery.isError,
    refetcAll: () => {
      transactionQuery.refetch();
      transactionQueryById.refetch();
    },
  };
}
