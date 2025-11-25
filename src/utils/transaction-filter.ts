import { ITransaction } from '@/types/schema';

export type TimePeriod = 'daily' | 'monthly' | 'yearly';

export const filterTransactionsByPeriod = (
  transactions: ITransaction[],
  period: TimePeriod
): ITransaction[] => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  return transactions.filter((txn: any) => {
    const txnDate = new Date(txn.createdAt || new Date());
    const txnYear = txnDate.getFullYear();
    const txnMonth = txnDate.getMonth();
    const txnDay = txnDate.getDate();

    switch (period) {
      case 'daily':
        return txnYear === currentYear && txnMonth === currentMonth && txnDay === currentDate;
      case 'monthly':
        return txnYear === currentYear && txnMonth === currentMonth;
      case 'yearly':
        return txnYear === currentYear;
      default:
        return true;
    }
  });
};

export const getDateRangeLabel = (period: TimePeriod): string => {
  const now = new Date();
  switch (period) {
    case 'daily':
      return `Today (${now.toLocaleDateString()})`;
    case 'monthly':
      return `This Month (${now.toLocaleString('default', { month: 'long', year: 'numeric' })})`;
    case 'yearly':
      return `This Year (${now.getFullYear()})`;
    default:
      return 'All Time';
  }
};

export const generateMonthlyChartData = (transactions: ITransaction[]) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentMonth = new Date().getMonth();
  const data: any[] = [];

  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const monthName = months[monthIndex];

    let income = 0;
    let expense = 0;

    transactions.forEach((txn: any) => {
      const txnDate = new Date(txn.createdAt || new Date());
      const txnMonth = txnDate.getMonth();

      if (txnMonth === monthIndex) {
        if (txn.type === 'INCOME') {
          income += txn.amount || 0;
        } else if (txn.type === 'EXPENSE') {
          expense += txn.amount || 0;
        }
      }
    });

    data.push({
      month: monthName,
      income: income / 1000000,
      expense: expense / 1000000,
    });
  }

  return data;
};

export const generateDailyChartData = (transactions: ITransaction[]) => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  return days.map((day) => {
    const dayName = day.toLocaleDateString('default', { weekday: 'short' });
    let income = 0;
    let expense = 0;

    transactions.forEach((txn: any) => {
      const txnDate = new Date(txn.createdAt || new Date());
      if (txnDate.toDateString() === day.toDateString()) {
        if (txn.type === 'INCOME') {
          income += txn.amount || 0;
        } else if (txn.type === 'EXPENSE') {
          expense += txn.amount || 0;
        }
      }
    });

    return {
      day: dayName,
      income: income / 1000000,
      expense: expense / 1000000,
    };
  });
};

export const generateYearlyChartData = (transactions: ITransaction[]) => {
  const currentYear = new Date().getFullYear();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return months.map((month, index) => {
    let income = 0;
    let expense = 0;

    transactions.forEach((txn: any) => {
      const txnDate = new Date(txn.createdAt || new Date());
      const txnYear = txnDate.getFullYear();
      const txnMonth = txnDate.getMonth();

      if (txnYear === currentYear && txnMonth === index) {
        if (txn.type === 'INCOME') {
          income += txn.amount || 0;
        } else if (txn.type === 'EXPENSE') {
          expense += txn.amount || 0;
        }
      }
    });

    return {
      month,
      income: income / 1000000,
      expense: expense / 1000000,
    };
  });
};
