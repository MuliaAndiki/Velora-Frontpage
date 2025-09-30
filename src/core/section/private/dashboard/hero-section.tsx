import React, { useState } from 'react';
import {
  LineChart,
  Line,
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
  Area,
  AreaChart,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
} from 'lucide-react';

const DashboardHeroSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  type StatCardProps = {
    title: any;
    amount: any;
    icon: any;
    trend?: any;
    trendValue?: any;
    color?: any;
  };

  const trendData = [
    { name: 'Jan', income: 4000, expense: 2400, saving: 1600 },
    { name: 'Feb', income: 3000, expense: 1398, saving: 1602 },
    { name: 'Mar', income: 2000, expense: 9800, saving: -7800 },
    { name: 'Apr', income: 2780, expense: 3908, saving: -1128 },
    { name: 'May', income: 1890, expense: 4800, saving: -2910 },
    { name: 'Jun', income: 2390, expense: 3800, saving: -1410 },
    { name: 'Jul', income: 3490, expense: 4300, saving: -810 },
  ];

  const expenseData = [
    { name: 'Food', value: 400, color: '#FF6B6B' },
    { name: 'Transport', value: 300, color: '#4ECDC4' },
    { name: 'Shopping', value: 200, color: '#FFE66D' },
    { name: 'Bills', value: 278, color: '#95E1D3' },
    { name: 'Others', value: 189, color: '#C7CEEA' },
  ];

  const recentTransactions = [
    {
      id: 1,
      name: 'Grocery Shopping',
      amount: -50000,
      date: '2024-10-01',
      type: 'expense',
      category: 'Food',
    },
    {
      id: 2,
      name: 'Salary',
      amount: 5000000,
      date: '2024-10-01',
      type: 'income',
      category: 'Salary',
    },
    {
      id: 3,
      name: 'Electricity Bill',
      amount: -150000,
      date: '2024-09-30',
      type: 'expense',
      category: 'Bills',
    },
    {
      id: 4,
      name: 'Coffee',
      amount: -35000,
      date: '2024-09-30',
      type: 'expense',
      category: 'Food',
    },
  ];

  const budgetData = [
    { category: 'Food', spent: 400000, budget: 600000, color: '#FF6B6B' },
    { category: 'Transport', spent: 300000, budget: 400000, color: '#4ECDC4' },
    { category: 'Shopping', spent: 450000, budget: 500000, color: '#FFE66D' },
    { category: 'Entertainment', spent: 200000, budget: 300000, color: '#95E1D3' },
  ];

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const StatCard: React.FC<StatCardProps> = ({
    title,
    amount,
    icon: Icon,
    trend,
    trendValue,
    color,
  }) => (
    <div
      className={`${color} p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-white bg-opacity-20 p-3 rounded-xl">
            <Icon className="text-white" size={24} />
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 ${trend === 'up' ? 'text-green-300' : 'text-red-300'}`}
            >
              {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span className="text-sm font-semibold">{trendValue}</span>
            </div>
          )}
        </div>
        <h3 className="text-white text-sm font-medium opacity-90 mb-2">{title}</h3>
        <p className="text-white text-3xl font-bold">{amount}</p>
      </div>
    </div>
  );

  return (
    <section className="relative w-full min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-start overflow-hidden bg-slate-900">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div className="flex-1 w-full max-w-7xl mx-auto relative z-10 p-6 lg:p-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-full mb-4">
            <span className="text-orange-400 text-lg font-bold">Velora</span>
            <span className="text-slate-300 text-sm">Your Financial Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Financial Dashboard</h1>
          <p className="text-slate-400">Overview of your financial activities</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Balance"
            amount={formatCurrency(8500000)}
            icon={Wallet}
            trend="up"
            trendValue="+12.5%"
            color="bg-gradient-to-r from-orange-600 to-purple-600"
          />
          <StatCard
            title="Income"
            amount={formatCurrency(5000000)}
            icon={TrendingUp}
            trend="up"
            trendValue="+8.2%"
            color="bg-gradient-to-r from-orange-500 to-red-600"
          />
          <StatCard
            title="Expense"
            amount={formatCurrency(2100000)}
            icon={TrendingDown}
            trend="down"
            trendValue="-3.1%"
            color="bg-gradient-to-r from-red-600 to-pink-600"
          />
          <StatCard
            title="Saving"
            amount={formatCurrency(2900000)}
            icon={PiggyBank}
            trend="up"
            trendValue="+15.3%"
            color="bg-gradient-to-r from-purple-600 to-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800 bg-opacity-60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-xl font-bold">Income vs Expense</h3>
              <div className="flex gap-2">
                {['week', 'month', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-lg text-sm transition ${
                      selectedPeriod === period
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={trendData}>
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
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
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

          <div className="bg-slate-800 bg-opacity-60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-slate-700">
            <h3 className="text-white text-xl font-bold mb-6">Expense by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent as any) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
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
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800 bg-opacity-60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-slate-700">
            <h3 className="text-white text-xl font-bold mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center p-4 bg-slate-700 bg-opacity-50 rounded-xl hover:bg-slate-700 transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === 'income'
                          ? 'bg-green-600 bg-opacity-20'
                          : 'bg-red-600 bg-opacity-20'
                      }`}
                    >
                      {transaction.type === 'income' ? (
                        <TrendingUp className="text-green-400" size={20} />
                      ) : (
                        <TrendingDown className="text-red-400" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{transaction.name}</p>
                      <p className="text-slate-400 text-sm">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-slate-500 text-sm">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 bg-opacity-60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-slate-700">
            <h3 className="text-white text-xl font-bold mb-6">Budget Progress</h3>
            <div className="space-y-6">
              {budgetData.map((item, index) => {
                const percentage = (item.spent / item.budget) * 100;
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-semibold">{item.category}</span>
                      <span className="text-slate-400 text-sm">
                        {formatCurrency(item.spent)} / {formatCurrency(item.budget)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">{percentage.toFixed(0)}% used</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-600 to-purple-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-2 group">
        <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
        <span className="font-semibold">Add Transaction</span>
      </button>
    </section>
  );
};

export default DashboardHeroSection;
