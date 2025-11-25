import { AlertCircle, MoreVertical, Pencil, Trash2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { goalProps } from '@/types/props';
import { AlertContexType, PopupInterface } from '@/types/ui';
import { formatCurrency } from '@/utils/number.format';
import { getDate } from '@/utils/string.format';

import { Button } from '../ui/button';

interface GoalPartialProps {
  onDeleteByID: (id: string) => void;
  alert: AlertContexType;
  handleOpenPopUp: (data: any) => void;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  trashole: any;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
}

const GoalPartial: React.FC<goalProps & GoalPartialProps> = ({
  data,
  onDeleteByID,
  alert,
  handleOpenPopUp,
  setId,
  trashole,
  setPopUpModal,
}) => {
  const percent = Math.min(data.percent || 0, 100);
  const isCompleted = data.status === 'COMPLATE';
  const isInProgress = data.status === 'INPROGRESS';
  const daysRemaining = data.endAt
    ? Math.ceil((new Date(data.endAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const getStatusColor = () => {
    if (isCompleted) return 'from-green-500 to-green-600';
    if (percent > 85) return 'from-red-500 to-red-600';
    if (percent > 50) return 'from-orange-500 to-orange-600';
    return 'from-blue-500 to-blue-600';
  };

  const getStatusLabel = () => {
    if (isCompleted) return 'Completed';
    if (percent > 85) return 'Almost There';
    if (percent > 50) return 'In Progress';
    return 'Just Started';
  };

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{data.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-linear-to-r ${getStatusColor()}`}
            >
              {getStatusLabel()}
            </div>
            {isCompleted && (
              <span className="text-green-400 text-sm font-medium">✓ Goal Achieved</span>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical size={18} className="text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuLabel className="font-semibold">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`/dashboard/goal/detail/${data.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <TrendingUp size={16} className="mr-2" />
                  View Details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => {
                  handleOpenPopUp(data);
                  setId(data.id);
                }}
                className="cursor-pointer"
              >
                <Pencil size={16} className="mr-2" />
                Edit Goal
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  alert.confirm({
                    title: 'Delete Goal',
                    deskripsi:
                      'Are you sure you want to delete this goal? This action cannot be undone.',
                    icon: 'warning',
                    onConfirm: () => {
                      onDeleteByID(data.id);
                    },
                    onClose: () => {},
                  })
                }
                className="cursor-pointer text-red-400"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">Progress</span>
          <span className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
            {percent}%
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full bg-linear-to-r ${getStatusColor()} transition-all duration-500 ease-out`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-700">
        <div>
          <p className="text-slate-400 text-xs font-medium mb-1">Current</p>
          <p className="text-2xl font-bold text-white">{formatCurrency(data.savedAmount || 0)}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs font-medium mb-1">Target</p>
          <p className="text-2xl font-bold text-white">{formatCurrency(data.targetAmount || 0)}</p>
        </div>
      </div>

      <div className="mb-6 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Start Date</span>
          <span className="text-white font-medium">{getDate(data.startAt)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Target Date</span>
          <span className="text-white font-medium">{getDate(data.endAt)}</span>
        </div>
        <div className="flex justify-between items-center text-sm bg-slate-700/30 rounded-lg p-3">
          <span className="text-slate-400 flex items-center gap-1">
            <AlertCircle size={14} />
            Remaining
          </span>
          <span className={`font-bold ${daysRemaining <= 0 ? 'text-red-400' : 'text-orange-400'}`}>
            {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
          </span>
        </div>
      </div>

      {!isCompleted && (
        <div className="bg-slate-700/20 border border-slate-700 rounded-lg p-4 mb-6">
          <p className="text-slate-400 text-xs font-medium mb-1">To Achieve Goal</p>
          <p className="text-xl font-bold text-orange-400">
            {formatCurrency(Math.max(0, (data.targetAmount || 0) - (data.savedAmount || 0)))}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Link href={`/dashboard/goal/detail/${data.id}`} className="flex-1">
          <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white transition-all duration-300">
            <TrendingUp size={16} className="mr-1" />
            View
          </Button>
        </Link>
        <Button
          onClick={() => {
            setId(data.id);
            setPopUpModal('insert-goal');
          }}
          className="flex-1 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white transition-all duration-300"
        >
          <Pencil size={16} className="mr-1" />
          Insert
        </Button>
      </div>
    </div>
  );
};

export default GoalPartial;
