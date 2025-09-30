import { useQuery } from '@tanstack/react-query';
import Api from '@/services/props.service';

export function useGetTransactions(params?: {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
}) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => Api.Transaction.getAll(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useGetTransactionById(id: string) {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: () => Api.Transaction.getById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
