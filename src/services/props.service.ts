import AuthApi from '@/services/auth/auth.service';
import BudgetApi from '@/services/budget/budget.service';
import CategoryApi from '@/services/category/category.service';
import TransactionApi from '@/services/transaction/transaction.service';
import GoalApi from '@/services/goal/goal.service';
import DashboardApi from '@/services/dashboard/dashboard.service';
import ReportApi from '@/services/report/report.service';
import ImportExportApi from '@/services/import-export/import-export.service';

class Api {
  static Auth = AuthApi;
  static Budget = BudgetApi;
  static Category = CategoryApi;
  static Transaction = TransactionApi;
  static Goal = GoalApi;
  static Dashboard = DashboardApi;
  static Report = ReportApi;
  static ImportExport = ImportExportApi;
}

export default Api;
