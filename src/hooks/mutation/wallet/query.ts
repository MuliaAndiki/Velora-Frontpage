import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

export function useWalletTransaction() {
  const walletQuery = useQuery({
    queryKey: ['wallet'],
    queryFn: () => Api.Wallet.get(),
    staleTime: 1000 * 60 * 5,
  });
  return {
    walletQuery: walletQuery.data?.data ?? [],
    getWallets: walletQuery.data?.data ?? [],
    isLoading: walletQuery.isLoading,
    isError: walletQuery.isError,
    refectAll: () => {
      walletQuery.refetch();
    },
  };
}
