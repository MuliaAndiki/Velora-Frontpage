import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Calendar,
  Tag,
  Trash2,
  Edit2,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

import Link from 'next/link';
// Types
interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  description?: string;
}

interface TransactionCardProps {
  transaction: Transaction;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

interface FilterOptions {
  type: 'all' | 'income' | 'expense';
  sortBy: 'date' | 'amount' | 'category';
  sortOrder: 'asc' | 'desc';
}

// Transaction Card Component
const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, onEdit, onDelete }) => {
  const isIncome = transaction.type === 'income';

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-5 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between gap-4">
        {/* Icon & Info */}
        <div className="flex items-center gap-4 flex-1">
          <div
            className={`${isIncome ? 'bg-green-600' : 'bg-red-600'} bg-opacity-20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
          >
            {isIncome ? (
              <TrendingUp className="text-green-400" size={24} />
            ) : (
              <TrendingDown className="text-red-400" size={24} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-white font-bold text-lg truncate">{transaction.title}</h4>
            <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Tag size={14} />
                <span>{transaction.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formatDate(transaction.date)}</span>
              </div>
            </div>
            {transaction.description && (
              <p className="text-slate-500 text-sm mt-2 line-clamp-1">{transaction.description}</p>
            )}
          </div>
        </div>

        {/* Amount & Actions */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1">
            {isIncome ? (
              <ArrowUpRight className="text-green-400" size={16} />
            ) : (
              <ArrowDownRight className="text-red-400" size={16} />
            )}
            <span className={`text-xl font-bold ${isIncome ? 'text-green-400' : 'text-red-400'}`}>
              {isIncome ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </span>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit?.(transaction.id)}
              className="p-2 bg-blue-600 bg-opacity-20 hover:bg-opacity-40 rounded-lg transition"
              aria-label="Edit transaction"
            >
              <Edit2 className="text-blue-400" size={16} />
            </button>
            <button
              onClick={() => onDelete?.(transaction.id)}
              className="p-2 bg-red-600 bg-opacity-20 hover:bg-opacity-40 rounded-lg transition"
              aria-label="Delete transaction"
            >
              <Trash2 className="text-red-400" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const TransactionHeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      title: 'Monthly Salary',
      amount: 8000000,
      type: 'income',
      category: 'Salary',
      date: '2024-10-01',
      description: 'Monthly salary payment from company',
    },
    {
      id: '2',
      title: 'Grocery Shopping',
      amount: 350000,
      type: 'expense',
      category: 'Food',
      date: '2024-10-01',
      description: 'Weekly groceries at supermarket',
    },
    {
      id: '3',
      title: 'Freelance Project',
      amount: 2500000,
      type: 'income',
      category: 'Freelance',
      date: '2024-09-30',
      description: 'Web development project payment',
    },
    {
      id: '4',
      title: 'Electric Bill',
      amount: 450000,
      type: 'expense',
      category: 'Utilities',
      date: '2024-09-29',
      description: 'Monthly electricity payment',
    },
    {
      id: '5',
      title: 'Online Course',
      amount: 500000,
      type: 'expense',
      category: 'Education',
      date: '2024-09-28',
      description: 'React advanced course subscription',
    },
    {
      id: '6',
      title: 'Side Hustle',
      amount: 1200000,
      type: 'income',
      category: 'Business',
      date: '2024-09-27',
      description: 'Side business income',
    },
    {
      id: '7',
      title: 'Restaurant',
      amount: 250000,
      type: 'expense',
      category: 'Food',
      date: '2024-09-26',
      description: 'Dinner with family',
    },
    {
      id: '8',
      title: 'Gasoline',
      amount: 150000,
      type: 'expense',
      category: 'Transportation',
      date: '2024-09-25',
      description: 'Monthly fuel refill',
    },
  ]);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Filter by type
    if (filters.type !== 'all') {
      result = result.filter((t) => t.type === filters.type);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchQuery, filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expense, total: income - expense };
  }, [filteredTransactions]);

  const handleEdit = (id: string): void => {
    console.log('Edit transaction:', id);
  };

  const handleDelete = (id: string): void => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleExport = (): void => {
    console.log('Export transactions');
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-2">
              All Transactions
            </h1>
            <p className="text-slate-400 text-lg">Track and manage your financial transactions</p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 text-white rounded-xl hover:bg-slate-700 transition-all duration-300"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-green-200" size={24} />
            <p className="text-green-200 text-sm font-medium">Total Income</p>
          </div>
          <p className="text-white text-3xl font-bold">{formatCurrency(stats.income)}</p>
        </div>
        <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="text-red-200" size={24} />
            <p className="text-red-200 text-sm font-medium">Total Expense</p>
          </div>
          <p className="text-white text-3xl font-bold">{formatCurrency(stats.expense)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Filter className="text-blue-200" size={24} />
            <p className="text-blue-200 text-sm font-medium">Net Balance</p>
          </div>
          <p className={`text-3xl font-bold ${stats.total >= 0 ? 'text-white' : 'text-red-300'}`}>
            {formatCurrency(stats.total)}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filters.type}
            onChange={(e) =>
              setFilters({ ...filters, type: e.target.value as FilterOptions['type'] })
            }
            className="px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Sort By */}
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })
            }
            className="px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition cursor-pointer"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="category">Sort by Category</option>
          </select>

          {/* Sort Order */}
          <select
            value={filters.sortOrder}
            onChange={(e) =>
              setFilters({ ...filters, sortOrder: e.target.value as FilterOptions['sortOrder'] })
            }
            className="px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition cursor-pointer"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <span>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-orange-400 hover:text-orange-300 transition"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-12 rounded-2xl text-center">
            <div className="text-slate-400 mb-4">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl font-semibold">No transactions found</p>
              <p className="text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>

      <button className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-3 group">
        <Plus className="group-hover:rotate-90 transition-transform duration-300" size={24} />
        <span className="font-semibold">Add Transaction</span>
      </button>
    </div>
  );
};

export default TransactionHeroSection;
