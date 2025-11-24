export interface CardDashboardCardType {
  image?: string;
  label: string;
  price: number;
}

export interface RecentCardType {
  image?: string;
  category: string;
  price: number;
  date: any;
}

export interface BudgetCardType {
  category: string;
  price: number;
  persentase?: number;
  used: number;
}

export interface CategoryType {
  id: string;
  name: string;
  type: string;
  avaUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalType {
  id: string;
  name: string;
  // desc: string;
  // label: string;
  savedAmount: number;
  status: string;
  targetAmount: number;
  remainingValue: number;
  percent?: number;
  startAt: string;
  endAt: string;
}

export interface GoalOverlayType {
  targetAmount: number;
  saveAmount: number;
  percent: number;
}

export interface TransactionPartialType {
  id: string;
  amount: number;
  category: CategoryType;
  createdAt: string;
  updatedAt: string;
  type: string;
  updateAt: string;
  description: string;
  receiptUrl: string;
  walletID: string;
}
