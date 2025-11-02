import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

class AuthQuery {
  ProfileData: any;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  refetchAll: () => void;

  constructor(profileQuery: any) {
    this.ProfileData = profileQuery.data?.data ?? null;
    this.isLoading = profileQuery.isLoading;
    this.isPending = profileQuery.isPending;
    this.isError = profileQuery.isError;
    this.refetchAll = () => {
      profileQuery.refetch();
    };
  }
}

export function useAuthQueryData() {
  const profileQuery = useQuery({
    queryFn: () => Api.Auth.GetProfile(),
    queryKey: ['profile', 'user'],
    staleTime: 1000 * 60 * 5,
  });
  return new AuthQuery(profileQuery);
}
