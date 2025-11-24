export interface InconeType {
  title: string;
  query: string;
}

export interface InconeChartType {
  month: string;
  Income: number;
  Expense: number;
}

export interface ExpenseChartType {
  category: string;
  visitors: number;
  fill: string;
}

export type TransactionType = 'INCOME' | 'EXPENSE' | null;

export type ReportType = 'TRANSACTIONS' | 'BUDGETS' | 'GOALS' | 'SUMMARY';
export type BudgetPeriodType = 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type BudgetStatusType = 'ACTIVE' | 'COMPLETED' | 'EXCEEDED';
