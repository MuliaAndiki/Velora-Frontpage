import { ITransaction } from '../schema';

export type FormCreateTransaction = Pick<
  ITransaction,
  'amount' | 'description' | 'receiptUrl' | 'type' | 'walletID'
>;
