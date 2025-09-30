export interface FormTransactionType {
  amount: number;
  date: Date;
  categoryId: string;
  description?: string;
  type: 'INCOME' | 'EXPENSE';
  attachment?: File;
}

export interface FormTransactionUpdateType extends Omit<FormTransactionType, 'attachment'> {
  id: string;
  attachment?: File;
}
