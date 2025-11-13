import { IGoal } from '../schema';

export type FormCreateGoal = Pick<
  IGoal,
  'name' | 'savedAmount' | 'endAt' | 'startAt' | 'targetAmount'
>;
export type PickID = Pick<IGoal, 'id'>;
