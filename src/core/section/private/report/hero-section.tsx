import { UseMutationResult } from '@tanstack/react-query';
import { Download, Plus } from 'lucide-react';
import React, { useState } from 'react';

import CategoryBreakdownChart from '@/components/chart/category-breakdown';
import ExpenseByCategoryChart from '@/components/chart/expense-by-category';
import IncomeByCategoryChart from '@/components/chart/income-by-category';
import IncomeVsExpenseTrend from '@/components/chart/income-vs-expense-trend';
import { Button } from '@/components/ui/button';
import PopUp from '@/components/ui/pop-up';
import View from '@/components/ui/view';
import { IReport, ITransaction } from '@/types/schema';
import { PopupInterface } from '@/types/ui';
import {
  filterTransactionsByPeriod,
  getDateRangeLabel,
  TimePeriod,
} from '@/utils/transaction-filter';

interface ReportHeroProps {
  reports: IReport[];
  reportSummary: any;
  transactions: ITransaction[];
  isLoading: boolean;
  isPending: boolean;
  onDelete: (id: string) => void;
  onDownload?: (fileUrl: string) => void;
  popUpModal: PopupInterface;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
  createReportMutation: UseMutationResult<any, Error, any>;
}

const ReportHeroSection: React.FC<ReportHeroProps> = ({
  reports,
  reportSummary,
  transactions,
  isLoading,
  isPending,
  onDelete,
  onDownload,
  popUpModal,
  setPopUpModal,
  createReportMutation,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('monthly');

  const filteredTransactions = filterTransactionsByPeriod(transactions, selectedPeriod);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <View className="relative w-full min-h-screen flex flex-col items-start justify-start overflow-hidden">
      <div className="w-full mx-auto relative z-10 p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 mb-2">
                Financial Reports
              </h1>
              <p className="text-slate-400 text-lg">
                {getDateRangeLabel(selectedPeriod)} - Comprehensive analysis of your financial
                activities
              </p>
            </div>
            <Button
              onClick={() => setPopUpModal('create-report')}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
            >
              <Plus size={20} />
              <span className="font-semibold">New Report</span>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['daily', 'monthly', 'yearly'] as TimePeriod[]).map((period) => (
              <Button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedPeriod === period
                    ? 'bg-linear-to-r from-orange-600 to-red-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {period === 'daily' ? 'Daily' : period === 'monthly' ? 'Monthly' : 'Yearly'}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IncomeVsExpenseTrend transactions={filteredTransactions} period={selectedPeriod} />
          <ExpenseByCategoryChart transactions={filteredTransactions} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IncomeByCategoryChart transactions={filteredTransactions} />
          <CategoryBreakdownChart transactions={filteredTransactions} />
        </div>

        {reports.length > 0 && (
          <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-white text-xl font-bold mb-6">Generated Reports</h3>
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">{report.title}</p>
                    <p className="text-slate-400 text-sm">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {report.fileUrl && (
                      <Button
                        onClick={() => report.fileUrl && onDownload?.(report.fileUrl)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                      >
                        <Download size={16} />
                      </Button>
                    )}
                    <Button
                      onClick={() => onDelete(report.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <PopUp isOpen={popUpModal === 'create-report'} onClose={() => setPopUpModal(null)}>
        <View className="w-full h-full">
          <div className="w-full flex justify-center items-center flex-col p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Generate Report</h2>
            <p className="text-slate-400 mb-6 text-center">
              Generate a PDF report for {getDateRangeLabel(selectedPeriod).toLowerCase()}
            </p>
            <Button
              onClick={() => {
                createReportMutation.mutate({
                  title: `Financial Report - ${new Date().toLocaleDateString()}`,
                  type: 'SUMMARY',
                  format: 'pdf',
                });
                setPopUpModal(null);
              }}
              disabled={isPending}
              className="px-6 py-3 bg-linear-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
            >
              {isPending ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
        </View>
      </PopUp>
    </View>
  );
};

export default ReportHeroSection;
