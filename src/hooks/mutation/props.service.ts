import AuthMutation from '@/hooks/mutation/auth/mutation';

import { useAuthData } from './auth/query';
import CategoryMutation from './category/mutation';
import { useCategoryQueries } from './category/query';
import GoalMutation from './goal/mutation';
import { useGoalQueries } from './goal/query';

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
});

export default useServices;
