import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

class AuthQuery {
  profileQuery: any;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  refetchAll: () => void;

  constructor({ profileQuery }: Partial<AuthQuery>) {
    this.profileQuery = profileQuery?.data?.data ?? null;
    this.isLoading = profileQuery?.isLoading || false;
    this.isPending = profileQuery?.isPending || false;
    this.isError = profileQuery?.isError || false;
    this.refetchAll = () => {
      profileQuery?.refetch?.();
    };
  }
}

export function useAuthQueryData() {
  const useUser = () => {
    const profileQuery = useQuery({
      queryFn: () => Api.Auth.GetProfile(),
      queryKey: ['profile'],
      staleTime: 1000 * 60 * 5,
    });
    return new AuthQuery({ profileQuery });
  };
  return { useUser };
}
