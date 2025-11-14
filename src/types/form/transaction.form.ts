import { ITransaction } from '../schema';

export type FormCreateTransaction = Pick<
  ITransaction,
  'amount' | 'date' | 'description' | 'receiptUrl' | 'type'
>;
