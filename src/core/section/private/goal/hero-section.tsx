'use client';
import React, { useState, useMemo } from 'react';
import {
  Target,
  TrendingUp,
  Calendar,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Check,
  Clock,
  Trophy,
  Zap,
} from 'lucide-react';

// Types
interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  icon: React.ElementType;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

interface GoalCardProps {
  goal: Goal;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAddFunds?: (id: string) => void;
}

// Goal Card Component
const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete, onAddFunds }) => {
  const percentage = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;
  const Icon = goal.icon;

  const daysRemaining = useMemo(() => {
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [goal.deadline]);

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

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProgressColor = (): string => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const isCompleted = percentage >= 100;
  const isUrgent = daysRemaining <= 7 && daysRemaining > 0;
  const isOverdue = daysRemaining < 0;

  return (
    <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent opacity-5 rounded-full -mr-16 -mt-16"></div>

      {/* Priority Badge */}
      <div
        className={`absolute top-4 right-4 ${getPriorityColor(goal.priority)} px-3 py-1 rounded-full text-white text-xs font-semibold uppercase`}
      >
        {goal.priority}
      </div>

      {/* Header */}
      <div className="flex items-start gap-4 mb-4 relative z-10">
        <div
          className={`${goal.color} bg-opacity-20 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={goal.color.replace('bg-', 'text-')} size={28} />
        </div>

        <div className="flex-1">
          <h3 className="text-white text-xl font-bold mb-1">{goal.title}</h3>
          <p className="text-slate-400 text-sm">{goal.category}</p>
        </div>
      </div>

      {/* Completion Badge */}
      {isCompleted && (
        <div className="mb-4 p-3 bg-green-600 bg-opacity-20 border border-green-600 border-opacity-50 rounded-xl flex items-center gap-2">
          <Trophy className="text-green-400" size={20} />
          <span className="text-green-400 font-semibold text-sm">Goal Completed! 🎉</span>
        </div>
      )}

      {/* Urgent Warning */}
      {isUrgent && !isCompleted && (
        <div className="mb-4 p-3 bg-yellow-600 bg-opacity-20 border border-yellow-600 border-opacity-50 rounded-xl flex items-center gap-2">
          <Zap className="text-yellow-400" size={20} />
          <span className="text-yellow-400 font-semibold text-sm">
            Only {daysRemaining} days left!
          </span>
        </div>
      )}

      {/* Overdue Warning */}
      {isOverdue && !isCompleted && (
        <div className="mb-4 p-3 bg-red-600 bg-opacity-20 border border-red-600 border-opacity-50 rounded-xl flex items-center gap-2">
          <Clock className="text-red-400" size={20} />
          <span className="text-red-400 font-semibold text-sm">
            Overdue by {Math.abs(daysRemaining)} days
          </span>
        </div>
      )}

      {/* Amount Info */}
      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-2">
          <div>
            <p className="text-slate-400 text-xs mb-1">Current</p>
            <p className="text-white text-2xl font-bold">{formatCurrency(goal.currentAmount)}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs mb-1">Target</p>
            <p className="text-white text-lg font-semibold">{formatCurrency(goal.targetAmount)}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden mb-2">
          <div
            className={`${getProgressColor()} h-full rounded-full transition-all duration-500 relative`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30"></div>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-300 font-semibold">{percentage.toFixed(1)}% achieved</span>
          <span className={remaining > 0 ? 'text-slate-400' : 'text-green-400'}>
            {remaining > 0 ? `${formatCurrency(remaining)} remaining` : 'Target reached!'}
          </span>
        </div>
      </div>

      {/* Deadline Info */}
      <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm">
        <Calendar size={16} />
        <span>Deadline: {formatDate(goal.deadline)}</span>
        <span
          className={`ml-auto font-semibold ${
            isOverdue ? 'text-red-400' : isUrgent ? 'text-yellow-400' : 'text-slate-400'
          }`}
        >
          {daysRemaining > 0 ? `${daysRemaining} days left` : isOverdue ? 'Overdue' : 'Today!'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onAddFunds?.(goal.id)}
          disabled={isCompleted}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
            isCompleted
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105'
          }`}
        >
          <DollarSign size={18} />
          <span>{isCompleted ? 'Completed' : 'Add Funds'}</span>
        </button>
        <button
          onClick={() => onEdit?.(goal.id)}
          className="p-3 bg-blue-600 bg-opacity-20 hover:bg-opacity-40 rounded-xl transition"
          aria-label="Edit goal"
        >
          <Edit2 className="text-blue-400" size={18} />
        </button>
        <button
          onClick={() => onDelete?.(goal.id)}
          className="p-3 bg-red-600 bg-opacity-20 hover:bg-opacity-40 rounded-xl transition"
          aria-label="Delete goal"
        >
          <Trash2 className="text-red-400" size={18} />
        </button>
      </div>
    </div>
  );
};

// Main Component
const GoalHeroSection: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 20000000,
      currentAmount: 15000000,
      deadline: '2025-12-31',
      category: 'Savings',
      icon: Target,
      color: 'bg-blue-500',
      priority: 'high',
    },
    {
      id: '2',
      title: 'New Laptop',
      targetAmount: 15000000,
      currentAmount: 8000000,
      deadline: '2025-06-30',
      category: 'Tech',
      icon: Trophy,
      color: 'bg-purple-500',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Vacation to Bali',
      targetAmount: 10000000,
      currentAmount: 10500000,
      deadline: '2025-08-15',
      category: 'Travel',
      icon: TrendingUp,
      color: 'bg-green-500',
      priority: 'low',
    },
    {
      id: '4',
      title: 'Car Down Payment',
      targetAmount: 50000000,
      currentAmount: 12000000,
      deadline: '2025-03-01',
      category: 'Vehicle',
      icon: Zap,
      color: 'bg-yellow-500',
      priority: 'high',
    },
    {
      id: '5',
      title: 'Wedding Fund',
      targetAmount: 100000000,
      currentAmount: 35000000,
      deadline: '2026-01-15',
      category: 'Life Events',
      icon: Target,
      color: 'bg-pink-500',
      priority: 'medium',
    },
    {
      id: '6',
      title: 'Investment Capital',
      targetAmount: 30000000,
      currentAmount: 18000000,
      deadline: '2024-09-30',
      category: 'Investment',
      icon: TrendingUp,
      color: 'bg-orange-500',
      priority: 'high',
    },
  ]);

  const stats = useMemo(() => {
    const total = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const saved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    const completed = goals.filter((g) => g.currentAmount / g.targetAmount >= 1).length;
    const inProgress = goals.length - completed;

    return { total, saved, completed, inProgress, percentage: (saved / total) * 100 };
  }, [goals]);

  const handleEdit = (id: string): void => {
    console.log('Edit goal:', id);
  };

  const handleDelete = (id: string): void => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleAddFunds = (id: string): void => {
    console.log('Add funds to goal:', id);
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
        <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-3">
          Financial Goals
        </h1>
        <p className="text-slate-400 text-lg">Set, track, and achieve your financial dreams</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-blue-200" size={24} />
            <p className="text-blue-200 text-sm font-medium">Total Goals</p>
          </div>
          <p className="text-white text-3xl font-bold">{goals.length}</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Check className="text-green-200" size={24} />
            <p className="text-green-200 text-sm font-medium">Completed</p>
          </div>
          <p className="text-white text-3xl font-bold">{stats.completed}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-red-600 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-orange-200" size={24} />
            <p className="text-orange-200 text-sm font-medium">In Progress</p>
          </div>
          <p className="text-white text-3xl font-bold">{stats.inProgress}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="text-purple-200" size={24} />
            <p className="text-purple-200 text-sm font-medium">Total Saved</p>
          </div>
          <p className="text-white text-2xl font-bold">{formatCurrency(stats.saved)}</p>
        </div>
      </div>

      <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-white text-xl font-bold">Overall Progress</h3>
          <span className="text-2xl font-bold text-white">{stats.percentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(stats.percentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-slate-400">
          <span>{formatCurrency(stats.saved)} saved</span>
          <span>{formatCurrency(stats.total)} target</span>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddFunds={handleAddFunds}
          />
        ))}
      </div>

      {/* Add Goal Button */}
      <button className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-3 group">
        <Plus className="group-hover:rotate-90 transition-transform duration-300" size={24} />
        <span className="font-semibold">Add Goal</span>
      </button>
    </div>
  );
};

export default GoalHeroSection;
