'use client';
import AuthMutation from '@/hooks/mutation/auth/mutation';

import { useAuthData } from './auth/query';
import CategoryMutation from './category/mutation';
import { useCategoryQueries } from './category/query';
import GoalMutation from './goal/mutation';
import { useGoalQueries } from './goal/query';
import TransactionMutation from './transaction/mutation';
import { useTransactionQueries } from './transaction/query';
import WalletMutation from './wallet/mutation';
import { useWalletTransaction } from './wallet/query';

export const useServices = () => ({
  Auth: {
    mutation: AuthMutation,
    query: useAuthData,
  },
  Category: {
    mutation: CategoryMutation,
    query: useCategoryQueries,
  },
  Goal: {
    mutation: GoalMutation,
    query: useGoalQueries,
  },
  Transaction: {
    mutation: TransactionMutation,
    query: useTransactionQueries,
  },
  Wallet: {
    mutation: WalletMutation,
    query: useWalletTransaction,
  },
});

export default useServices;
