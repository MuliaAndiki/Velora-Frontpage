import { useMemo } from 'react';
import { Cell, Legend,Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ITransaction } from '@/types/schema';
import { formatCurrency } from '@/utils/number.format';

interface CategoryData {
  name: string;
  value: number;
  color: string;
  percentage?: number;
}

interface ExpenseByCategoryProps {
  transactions: ITransaction[];
}

const ExpenseByCategoryChart: React.FC<ExpenseByCategoryProps> = ({ transactions }) => {
  const expenseCategories = useMemo(() => {
    const categoryMap: { [key: string]: { amount: number; color: string } } = {};
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#FFE66D',
      '#95E1D3',
      '#C7CEEA',
      '#FF8B94',
      '#A8E6CF',
      '#FFDAB9',
    ];
    let colorIndex = 0;

    transactions
      .filter((txn: any) => txn.type === 'EXPENSE')
      .forEach((txn: any) => {
        const categoryName = txn.category?.name || txn.categoryID || 'Uncategorized';
        if (!categoryMap[categoryName]) {
          categoryMap[categoryName] = {
            amount: 0,
            color: colors[colorIndex % colors.length],
          };
          colorIndex++;
        }
        categoryMap[categoryName].amount += txn.amount || 0;
      });

    return Object.entries(categoryMap)
      .map(([name, data]) => ({
        name,
        value: data.amount,
        color: data.color,
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const expenseCategoriesWithPercentage = useMemo(() => {
    const total = expenseCategories.reduce((sum, cat) => sum + cat.value, 0);
    return expenseCategories.map((cat) => ({
      ...cat,
      percentage: (cat.value / total) * 100,
    }));
  }, [expenseCategories]);

  const total = useMemo(
    () => expenseCategories.reduce((sum, cat) => sum + cat.value, 0),
    [expenseCategories]
  );

  return (
    <Card className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">Expense by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseCategoriesWithPercentage}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseCategoriesWithPercentage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 w-full space-y-2">
            {expenseCategoriesWithPercentage.slice(0, 5).map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-slate-300 text-sm">{category.name}</span>
                </div>
                <span className="text-white font-semibold text-sm">
                  {category.percentage?.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm">Total Expense</p>
          <p className="text-2xl font-bold text-red-400">{formatCurrency(total)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseByCategoryChart;
