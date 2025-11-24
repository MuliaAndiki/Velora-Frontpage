import { Plus } from 'lucide-react';

import BudgetCard from '@/components/partial/budget-partial';
import PopUp from '@/components/ui/pop-up';
import { FormCreateBudget } from '@/types/form/budget.form';
import { IBudget } from '@/types/schema';
import { PopupInterface } from '@/types/ui';
import { formatCurrency } from '@/utils/number.format';

import CreateBudgetForm from './_form/create-budget-form';
import DeleteBudgetConfirm from './_form/delete-budget-confirm';
import EditBudgetForm from './_form/edit-budget-form';

interface BudgetHeroProps {
  budgets: IBudget[];
  isLoading: boolean;
  isPending: boolean;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
  popUpModal: PopupInterface;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
  onCreate: () => void;
  formData: FormCreateBudget;
  setFormData: React.Dispatch<React.SetStateAction<FormCreateBudget>>;
  categories: any[];
  onCreateBudget: () => void;
  onUpdateBudget: () => void;
  onDeleteConfirm: () => void;
  selectedBudget?: IBudget;
  closePopUp: () => void;
}

const BudgetHeroSection: React.FC<BudgetHeroProps> = ({
  isLoading,
  isPending,
  onDelete,
  budgets,
  onEdit,
  popUpModal,
  setPopUpModal,
  onCreate,
  formData,
  setFormData,
  categories,
  onCreateBudget,
  onUpdateBudget,
  onDeleteConfirm,
  selectedBudget,
  closePopUp,
}) => {
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalLimit = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const overallPercentage = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 mb-3">
          Budget Manager
        </h1>
        <p className="text-slate-400 text-lg">Set and track your monthly spending limits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-linear-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-xl">
          <p className="text-blue-200 text-sm mb-2">Total Limit</p>
          <p className="text-white text-3xl font-bold">{formatCurrency(totalLimit)}</p>
        </div>
        <div className="bg-linear-to-br from-orange-600 to-red-600 p-6 rounded-2xl shadow-xl">
          <p className="text-orange-200 text-sm mb-2">Total Spent</p>
          <p className="text-white text-3xl font-bold">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="bg-linear-to-br from-green-600 to-green-800 p-6 rounded-2xl shadow-xl">
          <p className="text-green-200 text-sm mb-2">Remaining</p>
          <p className="text-white text-3xl font-bold">{formatCurrency(totalLimit - totalSpent)}</p>
        </div>
      </div>

      <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-white text-xl font-bold">Overall Budget Progress</h3>
          <span className="text-2xl font-bold text-white">{overallPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-linear-to-r from-orange-500 to-red-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(overallPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>

      <button
        onClick={onCreate}
        className="fixed bottom-8 right-8 z-50 bg-linear-to-r from-orange-600 to-red-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-3 group"
      >
        <Plus className="group-hover:rotate-90 transition-transform duration-300" size={24} />
        <span className="font-semibold">Add Budget</span>
      </button>

      <PopUp isOpen={popUpModal === 'create-budget'} onClose={closePopUp}>
        <CreateBudgetForm
          isPending={isPending}
          categories={categories}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onCreateBudget}
          onClose={closePopUp}
        />
      </PopUp>

      <PopUp isOpen={popUpModal === 'edit-budget'} onClose={closePopUp}>
        <EditBudgetForm
          isPending={isPending}
          categories={categories}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onUpdateBudget}
          onClose={closePopUp}
        />
      </PopUp>

      <PopUp isOpen={popUpModal === 'delete-budget'} onClose={closePopUp}>
        <DeleteBudgetConfirm
          isPending={isPending}
          budgetName={selectedBudget?.name || 'Budget'}
          onSubmit={onDeleteConfirm}
          onClose={closePopUp}
        />
      </PopUp>
    </div>
  );
};

export default BudgetHeroSection;
