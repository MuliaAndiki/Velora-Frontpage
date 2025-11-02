import { ExpenseChartType, InconeChartType, InconeType } from '@/types/partial';
export const ButtonIncome: InconeType[] = [
  { title: 'harian', query: 'harian' },
  { title: 'bulan', query: 'bulan' },
  { title: 'Tahun', query: 'Tahun' },
];

export const IncomeChartData: InconeChartType[] = [
  { month: 'January', Income: 186, Expense: 80 },
  { month: 'February', Income: 210, Expense: 95 },
  { month: 'March', Income: 175, Expense: 110 },
  { month: 'April', Income: 220, Expense: 130 },
  { month: 'May', Income: 198, Expense: 120 },
  { month: 'June', Income: 240, Expense: 150 },
  { month: 'July', Income: 260, Expense: 170 },
  { month: 'August', Income: 230, Expense: 160 },
  { month: 'September', Income: 210, Expense: 140 },
  { month: 'October', Income: 250, Expense: 180 },
  { month: 'November', Income: 225, Expense: 155 },
  { month: 'December', Income: 200, Expense: 130 },
];

export const ExpenseChartData: ExpenseChartType[] = [
  { category: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { category: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { category: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { category: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { category: 'other', visitors: 90, fill: 'var(--color-other)' },
];
