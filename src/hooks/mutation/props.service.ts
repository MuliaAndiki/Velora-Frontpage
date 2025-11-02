import AuthMutation from '@/hooks/mutation/auth/mutation';
import { useAuthQueryData } from '@/hooks/mutation/auth/query';

import CategoryMutation from './category/mutation';
import { useCategoryData } from './category/query';

class ServiceClass {
  static Auth = {
    mutation: AuthMutation,
    query: useAuthQueryData,
  };
  static Category = {
    mutation: CategoryMutation,
    query: useCategoryData,
  };
}

export default ServiceClass;
