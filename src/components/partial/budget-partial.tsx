import { Edit2, Trash2, TrendingUp } from 'lucide-react';

import { IBudget } from '@/types/schema';
import { formatCurrency } from '@/utils/number.format';

interface BudgetCardProps {
  budget: IBudget;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget, onEdit, onDelete }) => {
  if (
    !budget ||
    budget!.spent === undefined ||
    budget!.limit === undefined ||
    budget!.limit === 0
  ) {
    return null;
  }

  const percentage = (budget.spent / budget.limit) * 100;
  const remaining = budget.limit - budget.spent;

  const getProgressColor = (percent: number): string => {
    if (percent < 50) return 'bg-green-500';
    if (percent < 75) return 'bg-yellow-500';
    if (percent < 90) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getCategoryIcon = (): string => {
    const categoryName = budget.category?.name?.toLowerCase() || budget.name.toLowerCase();
    if (categoryName.includes('food') || categoryName.includes('makan')) return '🍽️';
    if (categoryName.includes('house') || categoryName.includes('rumah')) return '🏠';
    if (categoryName.includes('transport') || categoryName.includes('kendaraan')) return '🚗';
    if (categoryName.includes('shop') || categoryName.includes('belanja')) return '🛍️';
    if (categoryName.includes('health') || categoryName.includes('kesehatan')) return '❤️';
    if (categoryName.includes('entertain') || categoryName.includes('hiburan')) return '🎬';
    if (categoryName.includes('utility') || categoryName.includes('listrik')) return '⚡';
    return '💰';
  };

  return (
    <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className={` bg-opacity-20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 text-2xl`}
          >
            {getCategoryIcon()}
          </div>
          <div>
            <h3 className="text-white text-lg font-bold">{budget.name}</h3>
            <p className="text-slate-400 text-sm">{budget.category?.name || 'Budget'}</p>
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
            <div className="absolute inset-0 bg-linear-to-r from-transparent to-white opacity-20"></div>
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

export default BudgetCard;
