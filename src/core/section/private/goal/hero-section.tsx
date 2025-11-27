import { CheckCircle2, Plus, Target, TrendingUp, X, Zap } from 'lucide-react';

import GoalPartial from '@/components/partial/goal-partial';
import { Button } from '@/components/ui/button';
import PopUp from '@/components/ui/pop-up';
import View from '@/components/ui/view';
import { GoalOverlayType, GoalType } from '@/types/components';
import { FormCreateGoal, FormInsertGoal } from '@/types/form/goal.form';
import { IWallet } from '@/types/schema';
import { AlertContexType, PopupInterface } from '@/types/ui';
import { formatCurrency } from '@/utils/number.format';

import CreateGoalForm from './_form/create-goal-form';
import EditGoalForm from './_form/edit-goal-form';
import InsertGoalForm from './_form/insert-goal-form';

interface GoalProps {
  goalOverlayData: GoalOverlayType;
  goalData: GoalType[];
  walletData: IWallet;
  isPending: boolean;
  popUp: PopupInterface;
  setPopUp: React.Dispatch<React.SetStateAction<PopupInterface>>;
  formCreateGoal: FormCreateGoal;
  setFormCreateGoal: React.Dispatch<React.SetStateAction<FormCreateGoal>>;
  formEditGoal: FormCreateGoal;
  setFormEditGoal: React.Dispatch<React.SetStateAction<FormCreateGoal>>;
  onCreate: () => void;
  onDeleteAll: () => void;
  alert: AlertContexType;
  onDeleteByID: (id: string) => void;
  handleOpenPopUp: (data: any) => void;
  onEdit: () => void;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  trashhole: any;
  selectWalletId: string;
  onSelectWalletId: (id: string) => void;
  formInsertGoal: FormInsertGoal;
  setFormInsertGoal: React.Dispatch<React.SetStateAction<FormInsertGoal>>;
  onInsert: () => void;
  isLoading: boolean;
}

const GoalHeroSection: React.FC<GoalProps> = ({
  goalData,
  isPending,
  popUp,
  setPopUp,
  formCreateGoal,
  setFormCreateGoal,
  onCreate,
  onDeleteAll,
  alert,
  onDeleteByID,
  formEditGoal,
  setFormEditGoal,
  handleOpenPopUp,
  onEdit,
  setId,
  goalOverlayData,
  trashhole,
  walletData,
  selectWalletId,
  onSelectWalletId,
  formInsertGoal,
  setFormInsertGoal,
  onInsert,
  isLoading,
}) => {
  const completedGoals = goalData.filter((g: any) => g.status === 'COMPLATE').length;
  const inProgressGoals = goalData.filter((g: any) => g.status === 'INPROGRESS').length;

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  return (
    <View>
      <div className="w-full min-h-screen flex flex-col relative overflow-hidden">
        <div className="px-6 lg:px-8 pt-8 pb-6">
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 mb-3">
              Financial Goals
            </h1>
            <p className="text-slate-400 text-lg">Set, track, and achieve your financial dreams</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-sm font-medium">Total Goals</p>
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white">{goalData.length}</p>
              <p className="text-xs text-slate-500 mt-2">Goals created</p>
            </div>

            <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-sm font-medium">Completed</p>
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-white">{completedGoals}</p>
              <p className="text-xs text-green-400 mt-2">
                {goalData.length > 0 ? Math.round((completedGoals / goalData.length) * 100) : 0}%
                complete
              </p>
            </div>

            <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-sm font-medium">In Progress</p>
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-white">{inProgressGoals}</p>
              <p className="text-xs text-blue-400 mt-2">Active goals</p>
            </div>

            <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-sm font-medium">Total Saved</p>
                <Zap className="w-5 h-5 text-orange-400" />
              </div>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(goalOverlayData.saveAmount || 0)}
              </p>
              <p className="text-xs text-orange-400 mt-2">Combined savings</p>
            </div>
          </div>

          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold text-lg">Overall Progress</h3>
                <p className="text-slate-400 text-sm">All goals combined</p>
              </div>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
                {Math.min(goalOverlayData.percent || 0, 100)}%
              </p>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-linear-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(goalOverlayData.percent || 0, 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between mt-4 text-xs text-slate-400">
              <p>{formatCurrency(goalOverlayData.saveAmount || 0)} saved</p>
              <p>{formatCurrency(goalOverlayData.targetAmount || 0)} target</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-6 lg:px-8 pb-32">
          {goalData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goalData.map((goal) => (
                <GoalPartial
                  key={goal.id}
                  data={goal}
                  alert={alert}
                  setPopUpModal={setPopUp}
                  onDeleteByID={onDeleteByID}
                  handleOpenPopUp={handleOpenPopUp}
                  setId={setId}
                  trashole={trashhole}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-96">
              <Target size={64} className="text-slate-600 mb-4" />
              <p className="text-slate-400 text-lg font-medium">No goals yet</p>
              <p className="text-slate-500 text-sm">
                Create your first financial goal to get started
              </p>
            </div>
          )}
        </div>

        <Button
          onClick={() => setPopUp('goal')}
          className="fixed bottom-8 right-8 z-50 px-6 py-4 rounded-full shadow-2xl bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 hover:shadow-lg hover:shadow-orange-500/50 text-white font-semibold transition-all duration-300 flex items-center gap-2 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>New Goal</span>
        </Button>
      </div>
      <PopUp isOpen={popUp === 'goal'} onClose={() => setPopUp(null)}>
        <CreateGoalForm
          formCreateGoal={formCreateGoal}
          isPending={isPending}
          onCreate={onCreate}
          onSelectWalletId={onSelectWalletId}
          selectWalletId={selectWalletId}
          setFormCreateGoal={setFormCreateGoal}
          setPopUp={setPopUp}
          walletData={walletData}
        />
      </PopUp>

      <PopUp isOpen={popUp === 'edit-goal'} onClose={() => setPopUp(null)}>
        <EditGoalForm
          formEditGoal={formEditGoal}
          isPending={isPending}
          onEdit={onEdit}
          setFormEditGoal={setFormEditGoal}
          setPopUp={setPopUp}
        />
      </PopUp>
      <PopUp isOpen={popUp === 'insert-goal'} onClose={() => setPopUp(null)}>
        <InsertGoalForm
          setPopUp={setPopUp}
          formInsertGoal={formInsertGoal}
          setFormInsertGoal={setFormInsertGoal}
          walletClick={onSelectWalletId}
          walletData={walletData}
          selectWalletID={selectWalletId}
          onInsert={onInsert}
        />
      </PopUp>
    </View>
  );
};

export default GoalHeroSection;
