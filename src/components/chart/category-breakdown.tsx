import { useMemo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ITransaction } from '@/types/schema';
import { formatCurrency } from '@/utils/number.format';

interface CategoryBreakdownProps {
  transactions: ITransaction[];
}

const CategoryBreakdownChart: React.FC<CategoryBreakdownProps> = ({ transactions }) => {
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

  return (
    <Card className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 font-semibold py-3 px-4">Category</th>
                <th className="text-right text-slate-400 font-semibold py-3 px-4">Amount</th>
                <th className="text-right text-slate-400 font-semibold py-3 px-4">Percentage</th>
                <th className="text-right text-slate-400 font-semibold py-3 px-4">Progress</th>
              </tr>
            </thead>
            <tbody>
              {expenseCategoriesWithPercentage.map((category, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-700 hover:bg-slate-700 hover:bg-opacity-30 transition"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-white font-medium">{category.name}</span>
                    </div>
                  </td>
                  <td className="text-right text-white font-semibold py-3 px-4">
                    {formatCurrency(category.value)}
                  </td>
                  <td className="text-right text-slate-300 py-3 px-4">
                    {category.percentage?.toFixed(1)}%
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-3">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${category.percentage}%`,
                            backgroundColor: category.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdownChart;
