import { TransactionType } from '../partial';

export interface IAuth {
  id: string;
  email: string;
  fullName: string;
  password: string;
  token: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  otp: string;
  expOtp: Date;
  photoUrl: string;
  isVerify: boolean;
}

export interface ICategory {
  id: string;
  name: string;
  type: string;
  cate_avaUrl: string;
  userID: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGoal {
  id: string;
  name: string;
  targetAmount: number | undefined;
  savedAmount: number | undefined;
  startAt: string | null;
  endAt: string | null;
  UserID: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransaction {
  id: string;
  amount: number | undefined;
  description: string;
  receiptUrl: string;
  type: string | TransactionType;
  categoryID: string;
  userID: string;
}

export interface IWallet {
  id: string;
  name: string;
  balance: number;
  userID: string;
}
