import { Goal } from '../schema';

export type FormCreateGoal = Pick<Goal, 'name' | 'savedAmount' | 'deadline' | 'targetAmount'>;
export type PickID = Pick<Goal, 'id'>;
