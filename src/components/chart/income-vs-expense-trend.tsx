import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ITransaction } from '@/types/schema';
import { formatCurrency } from '@/utils/number.format';
import {
  generateDailyChartData,
  generateMonthlyChartData,
  generateYearlyChartData,
  TimePeriod,
} from '@/utils/transaction-filter';

interface IncomeVsExpenseTrendProps {
  transactions: ITransaction[];
  period: TimePeriod;
}

const IncomeVsExpenseTrend: React.FC<IncomeVsExpenseTrendProps> = ({ transactions, period }) => {
  const chartData = useMemo(() => {
    switch (period) {
      case 'daily':
        return generateDailyChartData(transactions);
      case 'yearly':
        return generateYearlyChartData(transactions);
      case 'monthly':
      default:
        return generateMonthlyChartData(transactions);
    }
  }, [transactions, period]);

  const stats = useMemo(() => {
    const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0);
    const totalExpense = chartData.reduce((sum, item) => sum + item.expense, 0);
    const savings = totalIncome - totalExpense;

    return { totalIncome, totalExpense, savings };
  }, [chartData]);

  const xAxisKey = period === 'daily' ? 'day' : period === 'yearly' ? 'month' : 'month';

  return (
    <Card className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">Income vs Expense Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-900/20 rounded-lg border border-green-700">
            <p className="text-green-400 text-sm font-medium">Total Income</p>
            <p className="text-2xl font-bold text-green-400">
              {formatCurrency(stats.totalIncome * 1000000)}
            </p>
          </div>
          <div className="p-4 bg-red-900/20 rounded-lg border border-red-700">
            <p className="text-red-400 text-sm font-medium">Total Expense</p>
            <p className="text-2xl font-bold text-red-400">
              {formatCurrency(stats.totalExpense * 1000000)}
            </p>
          </div>
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700">
            <p className="text-blue-400 text-sm font-medium">Savings</p>
            <p className="text-2xl font-bold text-blue-400">
              {formatCurrency(stats.savings * 1000000)}
            </p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey={xAxisKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number) => `${value.toFixed(2)}M`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorIncome)"
              name="Income"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#EF4444"
              fillOpacity={1}
              fill="url(#colorExpense)"
              name="Expense"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IncomeVsExpenseTrend;
