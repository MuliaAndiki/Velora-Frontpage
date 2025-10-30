import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/hooks/dispatch/dispatch';
import { useAppSelector } from '@/hooks/dispatch/dispatch';
import { useAlert } from '@/hooks/useAlert/costum-alert';

export function useAppNameSpase() {
  const currentUser = useAppSelector((state) => state.auth.currentUser?.user);
  const alert = useAlert();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return { alert, router, dispatch, queryClient, currentUser };
}
