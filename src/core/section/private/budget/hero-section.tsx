import {
  Car,
  Edit2,
  Film,
  Heart,
  Home,
  Plus,
  ShoppingCart,
  Trash2,
  TrendingUp,
  Utensils,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';

// Types
interface Budget {
  id: string;
  category: string;
  icon: React.ElementType;
  spent: number;
  limit: number;
  color: string;
}

interface BudgetCardProps {
  budget: Budget;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// Budget Card Component
const BudgetCard: React.FC<BudgetCardProps> = ({ budget, onEdit, onDelete }) => {
  const percentage = (budget.spent / budget.limit) * 100;
  const remaining = budget.limit - budget.spent;
  const Icon = budget.icon;

  const getProgressColor = (percent: number): string => {
    if (percent < 50) return 'bg-green-500';
    if (percent < 75) return 'bg-yellow-500';
    if (percent < 90) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`${budget.color} bg-opacity-20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`${budget.color.replace('bg-', 'text-')}`} size={24} />
          </div>
          <div>
            <h3 className="text-white text-lg font-bold">{budget.category}</h3>
            <p className="text-slate-400 text-sm">Monthly budget</p>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit?.(budget.id)}
            className="p-2 bg-blue-600 bg-opacity-20 hover:bg-opacity-40 rounded-lg transition"
          >
            <Edit2 className="text-blue-400" size={16} />
          </button>
          <button
            onClick={() => onDelete?.(budget.id)}
            className="p-2 bg-red-600 bg-opacity-20 hover:bg-opacity-40 rounded-lg transition"
          >
            <Trash2 className="text-red-400" size={16} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-white text-2xl font-bold">{formatCurrency(budget.spent)}</span>
          <span className="text-slate-400 text-sm">of {formatCurrency(budget.limit)}</span>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className={`${getProgressColor(percentage)} h-full rounded-full transition-all duration-500 relative`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-20"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-1">
          <TrendingUp size={14} className={percentage > 90 ? 'text-red-400' : 'text-green-400'} />
          <span
            className={
              percentage > 90 ? 'text-red-400 font-semibold' : 'text-green-400 font-semibold'
            }
          >
            {percentage.toFixed(1)}% used
          </span>
        </div>
        <span className={remaining < 0 ? 'text-red-400 font-semibold' : 'text-slate-300'}>
          {remaining < 0 ? 'Over budget!' : `${formatCurrency(remaining)} left`}
        </span>
      </div>

      {percentage > 90 && (
        <div className="mt-3 p-2 bg-red-600 bg-opacity-20 border border-red-600 border-opacity-50 rounded-lg">
          <p className="text-red-400 text-xs text-center font-medium">
            ⚠️ {percentage >= 100 ? 'Budget exceeded!' : 'Approaching limit!'}
          </p>
        </div>
      )}
    </div>
  );
};

// Main Component
const BudgetHeroSection: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      category: 'Housing',
      icon: Home,
      spent: 1000000,
      limit: 5000000,
      color: 'bg-blue-500',
    },
    {
      id: '2',
      category: 'Food',
      icon: Utensils,
      spent: 800000,
      limit: 1500000,
      color: 'bg-green-500',
    },
    {
      id: '3',
      category: 'Transportation',
      icon: Car,
      spent: 450000,
      limit: 800000,
      color: 'bg-yellow-500',
    },
    {
      id: '4',
      category: 'Shopping',
      icon: ShoppingCart,
      spent: 950000,
      limit: 1000000,
      color: 'bg-purple-500',
    },
    {
      id: '5',
      category: 'Healthcare',
      icon: Heart,
      spent: 200000,
      limit: 500000,
      color: 'bg-red-500',
    },
    {
      id: '6',
      category: 'Entertainment',
      icon: Film,
      spent: 350000,
      limit: 400000,
      color: 'bg-pink-500',
    },
    {
      id: '7',
      category: 'Utilities',
      icon: Zap,
      spent: 300000,
      limit: 600000,
      color: 'bg-orange-500',
    },
  ]);

  const handleEdit = (id: string): void => {
    console.log('Edit budget:', id);
    // Implement edit functionality
  };

  const handleDelete = (id: string): void => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
  };

  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalLimit = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const overallPercentage = (totalSpent / totalLimit) * 100;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-3">
          Budget Manager
        </h1>
        <p className="text-slate-400 text-lg">Set and track your monthly spending limits</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-xl">
          <p className="text-blue-200 text-sm mb-2">Total Budget</p>
          <p className="text-white text-3xl font-bold">{formatCurrency(totalLimit)}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-red-600 p-6 rounded-2xl shadow-xl">
          <p className="text-orange-200 text-sm mb-2">Total Spent</p>
          <p className="text-white text-3xl font-bold">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl shadow-xl">
          <p className="text-green-200 text-sm mb-2">Remaining</p>
          <p className="text-white text-3xl font-bold">{formatCurrency(totalLimit - totalSpent)}</p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-white text-xl font-bold">Overall Budget Progress</h3>
          <span className="text-2xl font-bold text-white">{overallPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(overallPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Budget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      {/* Add Budget Button */}
      <button className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-3 group">
        <Plus className="group-hover:rotate-90 transition-transform duration-300" size={24} />
        <span className="font-semibold">Add Budget</span>
      </button>
    </div>
  );
};

export default BudgetHeroSection;
