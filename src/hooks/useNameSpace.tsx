import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/hooks/dispatch/dispatch';
import { useAppSelector } from '@/hooks/dispatch/dispatch';
import { useAlert } from '@/hooks/useAlert/costum-alert';

import ServiceClass from './mutation/props.service';

export function useAppNameSpase() {
  const currentState = useAppSelector((state) => state);
  const alert = useAlert();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const serviceApp = ServiceClass;
  return { alert, router, dispatch, queryClient, currentState, serviceApp };
}
