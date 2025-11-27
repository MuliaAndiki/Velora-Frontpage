import { PlusCircle, TrendingDown, TrendingUp, Wallet as WalletIcon } from 'lucide-react';
import React, { useMemo } from 'react';

import ExpenseByCategoryChart from '@/components/chart/expense-by-category';
import IncomeVsExpenseTrend from '@/components/chart/income-vs-expense-trend';
import { Button } from '@/components/ui/button';
import { Field, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import PopUp from '@/components/ui/pop-up';
import View from '@/components/ui/view';
import { FormCreateWallet } from '@/types/form/wallet.form';
import { IBudget, ITransaction, IWallet } from '@/types/schema';
import { PopupInterface } from '@/types/ui';
import { formatCurrency } from '@/utils/number.format';

interface DashboardProps {
  popUpModal: PopupInterface;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
  transactions: ITransaction[];
  wallet: IWallet | null;
  budgets: IBudget[];
  formCreateWallet: FormCreateWallet;
  setFormCreateWallet: React.Dispatch<React.SetStateAction<FormCreateWallet>>;
  isPending: boolean;
  onWallet: () => void;
  t: any;
  isLoading: boolean;
}

const DashboardHeroSection: React.FC<DashboardProps> = ({
  transactions,
  wallet,
  budgets,
  popUpModal,
  setPopUpModal,
  formCreateWallet,
  setFormCreateWallet,
  isPending,
  onWallet,
  isLoading,
  t,
}) => {
  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  const monthStats = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((txn) => {
      if (txn.type === 'INCOME') {
        income += txn.amount || 0;
      } else if (txn.type === 'EXPENSE') {
        expense += txn.amount || 0;
      }
    });

    return { income, expense };
  }, [transactions]);
  const budgetStats = useMemo(() => {
    if (budgets.length === 0) return { totalBudget: 0, totalSpent: 0, utilization: 0 };

    const totalBudget = budgets.reduce((sum, b) => sum + (b.limit || 0), 0);
    const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
    const utilization = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

    return { totalBudget, totalSpent, utilization };
  }, [budgets]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  return (
    <View className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden">
      <div className="flex-1 w-full mx-auto relative z-10 p-6 lg:p-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-full mb-4">
            <span className="text-lg font-bold text-orange-400">Velora</span>
            <span className="text-sm text-slate-400">{t('dashboard.title')}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">{t('dashboard.title')}</h1>
          <p className="text-slate-400 text-lg">{t('dashboard.desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400 text-sm font-medium">Total Balance</p>
              <WalletIcon className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-white mb-2">
              {wallet ? formatCurrency(wallet.balance) : formatCurrency(0)}
            </p>
            <p className="text-xs text-slate-500">Wallet: {wallet?.name || 'No wallet'}</p>
          </div>

          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400 text-sm font-medium">This Month Income</p>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-white">
              {formatCurrency(monthStats.income)}
            </p>
            <p className="text-xs text-green-400 mt-2">
              +{transactions.filter((t) => t.type === 'INCOME').length} transactions
            </p>
          </div>

          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400 text-sm font-medium">This Month Expense</p>
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-white">
              {formatCurrency(monthStats.expense)}
            </p>
            <p className="text-xs text-red-400 mt-2">
              +{transactions.filter((t) => t.type === 'EXPENSE').length} transactions
            </p>
          </div>

          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400 text-sm font-medium">Budget Utilization</p>
              <div className="text-2xl font-bold text-blue-400">{budgetStats.utilization}%</div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
              <div
                className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(budgetStats.utilization, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">
              {formatCurrency(budgetStats.totalSpent)} / {formatCurrency(budgetStats.totalBudget)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IncomeVsExpenseTrend transactions={transactions} period="monthly" />
          <ExpenseByCategoryChart transactions={transactions} />
        </div>
        <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 mb-6">
          <h3 className="text-white text-xl font-bold mb-6">Recent Transactions</h3>
          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-slate-500 transition-all duration-300"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">Transaction</p>
                    <p className="text-slate-400 text-sm">{txn.description || 'No description'}</p>
                    <p className="text-slate-500 text-xs mt-1">Category: {txn.categoryID}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${txn.type === 'INCOME' ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {txn.type === 'INCOME' ? '+' : '-'}
                      {formatCurrency(txn.amount || 0)}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                        txn.type === 'INCOME'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {txn.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-400">No transactions yet</p>
              <p className="text-slate-500 text-sm">Start by creating your first transaction</p>
            </div>
          )}
        </div>

        {budgets.length > 0 && (
          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-6">Active Budgets</h3>
            <div className="space-y-4">
              {budgets.slice(0, 3).map((budget) => {
                const percentage =
                  budget.limit > 0 ? Math.round((budget.spent / budget.limit) * 100) : 0;
                const isOverBudget = percentage > 100;

                return (
                  <div
                    key={budget.id}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-white font-medium">{budget.category?.name || 'Budget'}</p>
                      <p
                        className={`text-sm font-bold ${isOverBudget ? 'text-red-400' : 'text-green-400'}`}
                      >
                        {percentage}%
                      </p>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isOverBudget
                            ? 'bg-linear-to-r from-red-500 to-red-600'
                            : 'bg-linear-to-r from-blue-500 to-blue-600'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={() => setPopUpModal('wallet')}
        className="fixed bottom-8 right-8 z-50 px-6 py-4 rounded-full shadow-2xl bg-linear-to-r from-orange-600 to-red-600 hover:shadow-lg hover:shadow-orange-500/50 text-white font-semibold transition-all duration-300 flex items-center gap-2"
      >
        <PlusCircle size={20} />
        <span>Create Wallet</span>
      </Button>

      <PopUp isOpen={popUpModal === 'wallet'} onClose={() => setPopUpModal(null)}>
        <View className="w-full h-full">
          <div className="w-full flex justify-center items-center flex-col">
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                onWallet();
              }}
            >
              <Field>
                <FieldTitle>Wallet Name</FieldTitle>
                <Input
                  placeholder="e.g., Main Wallet, Savings, etc."
                  value={formCreateWallet.name}
                  onChange={(e) =>
                    setFormCreateWallet((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <Button
                  variant={'outline'}
                  type="submit"
                  disabled={isPending}
                  className="mt-4 w-full"
                >
                  {isPending ? 'Creating...' : 'Create Wallet'}
                </Button>
              </Field>
            </form>
          </div>
        </View>
      </PopUp>
    </View>
  );
};

export default DashboardHeroSection;
