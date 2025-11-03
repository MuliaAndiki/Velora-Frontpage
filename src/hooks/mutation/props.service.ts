import AuthMutation from '@/hooks/mutation/auth/mutation';
import { useAuthQueryData } from '@/hooks/mutation/auth/query';

import CategoryMutation from './category/mutation';
import { useCategoryData } from './category/query';
import GoalMutation from './goal/mutation';
import { useGoalData } from './goal/query';

class ServiceClass {
  static Auth = {
    mutation: AuthMutation,
    query: useAuthQueryData,
  };
  static Category = {
    mutation: CategoryMutation,
    query: useCategoryData,
  };
  static Goal = {
    mutation: GoalMutation,
    query: useGoalData,
  };
}

export default ServiceClass;
