export interface FormGoalType {
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  description?: string;
  icon?: string;
}

export interface FormGoalUpdateType extends FormGoalType {
  id: string;
}
