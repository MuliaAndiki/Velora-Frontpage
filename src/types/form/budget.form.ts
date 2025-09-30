export interface FormBudgetType {
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  categoryId: string;
  description?: string;
}

export interface FormBudgetUpdateType extends FormBudgetType {
  id: string;
}
