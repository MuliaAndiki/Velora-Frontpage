import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  FileText,
  Circle,
} from 'lucide-react';

// Types
interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
  percentage?: number;
}

interface ReportPeriod {
  label: string;
  value: 'week' | 'month' | 'quarter' | 'year';
}

interface ReportStats {
  totalIncome: number;
  totalExpense: number;
  totalSavings: number;
  avgIncome: number;
  avgExpense: number;
  savingsRate: number;
}

// Main Component
const ReportHeroSection: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod['value']>('month');
  const [reportType, setReportType] = useState<'overview' | 'income' | 'expense'>('overview');

  const periods: ReportPeriod[] = [
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'This Quarter', value: 'quarter' },
    { label: 'This Year', value: 'year' },
  ];

  // Sample Data
  const monthlyData: MonthlyData[] = [
    { month: 'Jan', income: 8000000, expense: 5500000, savings: 2500000 },
    { month: 'Feb', income: 7500000, expense: 5200000, savings: 2300000 },
    { month: 'Mar', income: 9000000, expense: 6000000, savings: 3000000 },
    { month: 'Apr', income: 8500000, expense: 5800000, savings: 2700000 },
    { month: 'May', income: 8200000, expense: 5600000, savings: 2600000 },
    { month: 'Jun', income: 8800000, expense: 6200000, savings: 2600000 },
    { month: 'Jul', income: 9200000, expense: 6500000, savings: 2700000 },
    { month: 'Aug', income: 8600000, expense: 5900000, savings: 2700000 },
    { month: 'Sep', income: 9500000, expense: 6800000, savings: 2700000 },
    { month: 'Oct', income: 8900000, expense: 6100000, savings: 2800000 },
  ];

  const expenseCategories: CategoryData[] = [
    { name: 'Food & Dining', value: 2500000, color: '#FF6B6B' },
    { name: 'Transportation', value: 1800000, color: '#4ECDC4' },
    { name: 'Shopping', value: 1500000, color: '#FFE66D' },
    { name: 'Bills & Utilities', value: 1200000, color: '#95E1D3' },
    { name: 'Entertainment', value: 800000, color: '#C7CEEA' },
    { name: 'Healthcare', value: 600000, color: '#FF8B94' },
    { name: 'Education', value: 500000, color: '#A8E6CF' },
    { name: 'Others', value: 400000, color: '#FFDAB9' },
  ];

  const incomeCategories: CategoryData[] = [
    { name: 'Salary', value: 7000000, color: '#10B981' },
    { name: 'Freelance', value: 1500000, color: '#3B82F6' },
    { name: 'Business', value: 1200000, color: '#8B5CF6' },
    { name: 'Investment', value: 800000, color: '#F59E0B' },
    { name: 'Others', value: 500000, color: '#6366F1' },
  ];

  // Calculate statistics
  const stats: ReportStats = useMemo(() => {
    const totalIncome = monthlyData.reduce((sum, data) => sum + data.income, 0);
    const totalExpense = monthlyData.reduce((sum, data) => sum + data.expense, 0);
    const totalSavings = monthlyData.reduce((sum, data) => sum + data.savings, 0);
    const avgIncome = totalIncome / monthlyData.length;
    const avgExpense = totalExpense / monthlyData.length;
    const savingsRate = (totalSavings / totalIncome) * 100;

    return {
      totalIncome,
      totalExpense,
      totalSavings,
      avgIncome,
      avgExpense,
      savingsRate,
    };
  }, [monthlyData]);

  // Add percentage to category data
  const expenseCategoriesWithPercentage = useMemo(() => {
    const total = expenseCategories.reduce((sum, cat) => sum + cat.value, 0);
    return expenseCategories.map((cat) => ({
      ...cat,
      percentage: (cat.value / total) * 100,
    }));
  }, [expenseCategories]);

  const incomeCategoriesWithPercentage = useMemo(() => {
    const total = incomeCategories.reduce((sum, cat) => sum + cat.value, 0);
    return incomeCategories.map((cat) => ({
      ...cat,
      percentage: (cat.value / total) * 100,
    }));
  }, [incomeCategories]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleExport = (): void => {
    console.log('Export report');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-2">
              Financial Reports
            </h1>
            <p className="text-slate-400 text-lg">
              Comprehensive analysis of your financial activities
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
          >
            <Download size={20} />
            <span className="font-semibold">Export Report</span>
          </button>
        </div>

        {/* Period & Report Type Selector */}
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedPeriod === period.value
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setReportType('overview')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                reportType === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setReportType('income')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                reportType === 'income'
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setReportType('expense')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                reportType === 'expense'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              Expense
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-green-200" size={24} />
            <p className="text-green-200 text-sm font-medium">Total Income</p>
          </div>
          <p className="text-white text-2xl lg:text-3xl font-bold mb-1">
            {formatCurrency(stats.totalIncome)}
          </p>
          <p className="text-green-200 text-xs">Avg: {formatCurrency(stats.avgIncome)}</p>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="text-red-200" size={24} />
            <p className="text-red-200 text-sm font-medium">Total Expense</p>
          </div>
          <p className="text-white text-2xl lg:text-3xl font-bold mb-1">
            {formatCurrency(stats.totalExpense)}
          </p>
          <p className="text-red-200 text-xs">Avg: {formatCurrency(stats.avgExpense)}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="text-blue-200" size={24} />
            <p className="text-blue-200 text-sm font-medium">Total Savings</p>
          </div>
          <p className="text-white text-2xl lg:text-3xl font-bold mb-1">
            {formatCurrency(stats.totalSavings)}
          </p>
          <p className="text-blue-200 text-xs">From period total</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Circle className="text-purple-200" size={24} />
            <p className="text-purple-200 text-sm font-medium">Savings Rate</p>
          </div>
          <p className="text-white text-2xl lg:text-3xl font-bold mb-1">
            {stats.savingsRate.toFixed(1)}%
          </p>
          <p className="text-purple-200 text-xs">Of total income</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Income vs Expense Trend */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-orange-400" size={24} />
            <h3 className="text-white text-xl font-bold">Income vs Expense Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorIncome)"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorExpense)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Savings */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-blue-400" size={24} />
            <h3 className="text-white text-xl font-bold">Monthly Savings</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend />
              <Bar dataKey="savings" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense by Category */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Circle className="text-red-400" size={24} />
            <h3 className="text-white text-xl font-bold">Expense by Category</h3>
          </div>
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
        </div>

        {/* Income by Category */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-green-400" size={24} />
            <h3 className="text-white text-xl font-bold">Income by Category</h3>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={incomeCategoriesWithPercentage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incomeCategoriesWithPercentage.map((entry, index) => (
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
              {incomeCategoriesWithPercentage.map((category, index) => (
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
        </div>
      </div>

      {/* Category Details Table */}
      <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="text-orange-400" size={24} />
          <h3 className="text-white text-xl font-bold">Category Breakdown</h3>
        </div>
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
      </div>
    </div>
  );
};

export default ReportHeroSection;
