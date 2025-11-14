import AuthMutation from '@/hooks/mutation/auth/mutation';

import { useAuthData } from './auth/query';
import CategoryMutation from './category/mutation';
import { useCategoryQueries } from './category/query';
import GoalMutation from './goal/mutation';
import { useGoalQueries } from './goal/query';
import TransactionMutation from './transaction/mutation';
import { useTransactionQueries } from './transaction/query';

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
});

export default useServices;
