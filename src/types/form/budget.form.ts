import { IBudget } from '../schema';

export type FormCreateBudget = Pick<
  IBudget,
  'name' | 'categoryID' | 'limit' | 'period' | 'startDate' | 'endDate'
>;
export type PickGetID = Pick<IBudget, 'id'>;
