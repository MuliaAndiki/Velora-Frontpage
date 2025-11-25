import { AlertCircle, ArrowLeft, Calendar, CheckCircle2, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import View from '@/components/ui/view';
import { goalProps } from '@/types/props';
import { formatCurrency } from '@/utils/number.format';
import { getDate } from '@/utils/string.format';

const GoalDetailHeroSection: React.FC<goalProps> = ({ data }) => {
  if (!data) {
    return (
      <View>
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Target size={64} className="text-slate-600 mb-4 mx-auto" />
            <p className="text-slate-400 text-lg">Loading goal details...</p>
          </div>
        </div>
      </View>
    );
  }

  const percent = Math.min(data.percent || 0, 100);
  const isCompleted = data.status === 'COMPLATE';
  const remainingAmount = Math.max(0, (data.targetAmount || 0) - (data.savedAmount || 0));
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
    if (isCompleted) return 'Goal Completed';
    if (percent > 85) return 'Almost There';
    if (percent > 50) return 'More Than Halfway';
    if (percent > 0) return 'Just Started';
    return 'Not Started';
  };

  const getMotivationalMessage = () => {
    if (isCompleted) return ' Congratulations! You have achieved your goal!';
    if (percent > 85) return ' You are so close! Keep pushing!';
    if (percent > 50) return ' Great progress! You are more than halfway there!';
    if (percent > 0) return ' Good start! Keep going!';
    return ' Set your first milestone and start saving!';
  };

  return (
    <View>
      <div className="w-full min-h-screen bg-slate-900 overflow-hidden ">
        <div className="px-6 lg:px-8 pt-6 pb-8 ">
          <Link href="/dashboard/goal">
            <Button variant="ghost" className="mb-4 text-slate-400 hover:text-white">
              <ArrowLeft size={20} className="mr-2" />
              Back to Goals
            </Button>
          </Link>
        </div>

        <div className="px-6 lg:px-8  mx-auto">
          <div className="mb-12">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">{data.name}</h1>
                <p className="text-slate-400 text-lg">{getMotivationalMessage()}</p>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-linear-to-r ${getStatusColor()}`}
              >
                {getStatusLabel()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-sm font-medium">Current Savings</p>
                <TrendingUp size={20} className="text-orange-400" />
              </div>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(data.savedAmount || 0)}
              </p>
              <p className="text-xs text-slate-500 mt-2">Amount saved so far</p>
            </div>

            <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-sm font-medium">Target Amount</p>
                <Target size={20} className="text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(data.targetAmount || 0)}
              </p>
              <p className="text-xs text-slate-500 mt-2">Your goal target</p>
            </div>

            <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-sm font-medium">Remaining</p>
                <AlertCircle size={20} className="text-red-400" />
              </div>
              <p className="text-3xl font-bold text-white">{formatCurrency(remainingAmount)}</p>
              <p className="text-xs text-slate-500 mt-2">Still need to save</p>
            </div>

            <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-sm font-medium">Progress</p>
                {isCompleted && <CheckCircle2 size={20} className="text-green-400" />}
              </div>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
                {percent}%
              </p>
              <p className="text-xs text-slate-500 mt-2">Goal completion rate</p>
            </div>
          </div>

          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Overall Progress</h2>
            <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden mb-4">
              <div
                className={`h-6 rounded-full bg-linear-to-r ${getStatusColor()} transition-all duration-500 ease-out flex items-center justify-center`}
                style={{ width: `${percent}%` }}
              >
                {percent > 10 && <span className="text-white text-xs font-bold">{percent}%</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-slate-400 mb-1">Started</p>
                <p className="text-white font-semibold">{formatCurrency(data.savedAmount || 0)}</p>
              </div>
              <div className="text-center">
                <p className="text-slate-400 mb-1">Progress</p>
                <p className="text-white font-semibold">
                  {Math.round((percent / 100) * (data.targetAmount || 0))}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 mb-1">Target</p>
                <p className="text-white font-semibold">{formatCurrency(data.targetAmount || 0)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar size={24} className="text-blue-400" />
                Timeline
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">Start Date</p>
                  <p className="text-white font-semibold text-lg">{getDate(data.startAt)}</p>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <p className="text-slate-400 text-sm font-medium mb-1">Target Date</p>
                  <p className="text-white font-semibold text-lg">{getDate(data.endAt)}</p>
                </div>
                <div className="border-t border-slate-700 pt-4 bg-slate-700/20 rounded-lg p-4">
                  <p className="text-slate-400 text-sm font-medium mb-1">Time Remaining</p>
                  <p
                    className={`text-lg font-bold ${daysRemaining <= 0 ? 'text-red-400' : 'text-green-400'}`}
                  >
                    {daysRemaining > 0 ? `${daysRemaining} days left` : 'Deadline passed'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp size={24} className="text-orange-400" />
                Savings Summary
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">Monthly Rate</p>
                  <p className="text-white font-semibold text-lg">
                    {daysRemaining > 0
                      ? formatCurrency(Math.round(remainingAmount / (daysRemaining / 30)))
                      : 'N/A'}
                  </p>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <p className="text-slate-400 text-sm font-medium mb-1">Total Days</p>
                  <p className="text-white font-semibold text-lg">
                    {Math.ceil(
                      (new Date(data.endAt).getTime() - new Date(data.startAt).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{' '}
                    days
                  </p>
                </div>
                <div className="border-t border-slate-700 pt-4 bg-slate-700/20 rounded-lg p-4">
                  <p className="text-slate-400 text-sm font-medium mb-1">Daily Rate</p>
                  <p className="text-lg font-bold text-blue-400">
                    {daysRemaining > 0
                      ? formatCurrency(Math.round(remainingAmount / daysRemaining))
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isCompleted ? (
            <div className="bg-linear-to-br from-green-900/20 to-green-800/20 border border-green-500/30 rounded-2xl p-8 text-center">
              <CheckCircle2 size={64} className="text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Goal Completed!</h3>
              <p className="text-green-400 text-lg">
                You have successfully achieved your financial goal. Congratulations! 🎉
              </p>
            </div>
          ) : (
            <div className="bg-linear-to-br from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Keep Going!</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Required per month</p>
                  <p className="text-xl font-bold text-orange-400">
                    {daysRemaining > 0
                      ? formatCurrency(Math.round(remainingAmount / (daysRemaining / 30)))
                      : 'N/A'}
                  </p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Progress this week</p>
                  <p className="text-xl font-bold text-blue-400">-</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Time to deadline</p>
                  <p
                    className={`text-xl font-bold ${daysRemaining <= 0 ? 'text-red-400' : 'text-green-400'}`}
                  >
                    {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </View>
  );
};

export default GoalDetailHeroSection;
