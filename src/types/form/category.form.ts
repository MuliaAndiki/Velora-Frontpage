export interface FormCategoryType {
  name: string;
  type: 'INCOME' | 'EXPENSE';
  icon?: string;
  color?: string;
  description?: string;
}

export interface FormCategoryUpdateType extends FormCategoryType {
  id: string;
}
