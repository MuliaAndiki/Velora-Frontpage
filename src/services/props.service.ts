import AuthApi from '@/services/auth/auth.service';
import BudgetApi from '@/services/budget/budget.service';
import CategoryApi from '@/services/category/category.service';
import DashboardApi from '@/services/dashboard/dashboard.service';
import GoalApi from '@/services/goal/goal.service';
import ImportExportApi from '@/services/import-export/import-export.service';
import ReportApi from '@/services/report/report.service';
import TransactionApi from '@/services/transaction/transaction.service';

import WalletApi from './wallet/wallet.service';

class Api {
  static Auth = new AuthApi();
  static Budget = new BudgetApi();
  static Category = new CategoryApi();
  static Transaction = new TransactionApi();
  static Goal = new GoalApi();
  static Dashboard = new DashboardApi();
  static Report = new ReportApi();
  static ImportExport = new ImportExportApi();
  static Wallet = new WalletApi();
}

export default Api;
