import { BudgetPeriodType, BudgetStatusType, ReportType, TransactionType } from '../partial';

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
  walletID: string;
}

export interface ITransaction {
  id: string;
  amount: number | undefined;
  description: string;
  receiptUrl: string;
  type: string | TransactionType;
  categoryID: string;
  userID: string;
  walletID: string;
}

export interface IWallet {
  id: string;
  name: string;
  balance: number;
  userID: string;
}

export interface IReport {
  id: string;
  title: string;
  type: ReportType;
  startDate: Date;
  endDate: Date;
  totalIncome: number;
  totalExpense: number;
  netAmount: number;
  fileUrl: string | null;
  format: string;
  userID: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBudget {
  id: string;
  name: string;
  categoryID: string;
  limit: number;
  spent: number;
  period: BudgetPeriodType;
  startDate: Date;
  endDate: Date | null;
  status: BudgetStatusType;
  userID: string;
  createdAt: Date;
  updatedAt: Date;
  category: ICategory;
}
