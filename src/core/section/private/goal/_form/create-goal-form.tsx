import { X } from 'lucide-react';

import WalletCard from '@/components/partial/wallet-partial';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import View from '@/components/ui/view';
import { FormCreateGoal } from '@/types/form/goal.form';
import { IWallet } from '@/types/schema';
import { PopupInterface } from '@/types/ui';

interface CreateGoalProps {
  onCreate: () => void;
  setPopUp: React.Dispatch<React.SetStateAction<PopupInterface>>;
  formCreateGoal: FormCreateGoal;
  setFormCreateGoal: React.Dispatch<React.SetStateAction<FormCreateGoal>>;
  walletData: IWallet;
  isPending: boolean;
  selectWalletId: string;
  onSelectWalletId: (id: string) => void;
}

const CreateGoalForm: React.FC<CreateGoalProps> = ({
  onCreate,
  setPopUp,
  formCreateGoal,
  setFormCreateGoal,
  walletData,
  isPending,
  onSelectWalletId,
  selectWalletId,
}) => {
  return (
    <View className="w-full h-full">
      <Field className="flex justify-center items-center w-full flex-col">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onCreate();
          }}
          className="w-full space-y-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <FieldTitle className="text-2xl font-bold text-white">Create New Goal</FieldTitle>
              <p className="text-slate-400 text-sm mt-1">Define your financial objective</p>
            </div>
            <X
              size={24}
              onClick={() => setPopUp(null)}
              className="cursor-pointer hover:scale-110 transition-transform text-slate-400"
            />
          </div>

          <div className="space-y-4">
            <div>
              <FieldContent>
                <FieldTitle className="text-sm font-semibold text-white mb-2">Goal Name</FieldTitle>
                <Input
                  placeholder="e.g., Emergency Fund, Vacation, Car..."
                  value={formCreateGoal.name}
                  onChange={(e) =>
                    setFormCreateGoal((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 rounded-lg"
                />
              </FieldContent>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldContent>
                  <FieldTitle className="text-sm font-semibold text-white mb-2">
                    Target Amount
                  </FieldTitle>
                  <Input
                    placeholder="Target amount"
                    type="number"
                    inputMode="numeric"
                    value={formCreateGoal.targetAmount || ''}
                    onChange={(e) =>
                      setFormCreateGoal((prev) => ({
                        ...prev,
                        targetAmount: Number(e.target.value),
                      }))
                    }
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 rounded-lg"
                  />
                </FieldContent>
              </div>

              <div>
                <FieldContent>
                  <FieldTitle className="text-sm font-semibold text-white mb-2">
                    Already Saved
                  </FieldTitle>
                  <Input
                    placeholder="Current amount"
                    type="number"
                    inputMode="numeric"
                    value={formCreateGoal.savedAmount || ''}
                    onChange={(e) =>
                      setFormCreateGoal((prev) => ({
                        ...prev,
                        savedAmount: Number(e.target.value),
                      }))
                    }
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 rounded-lg"
                  />
                </FieldContent>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldContent>
                  <FieldTitle className="text-sm font-semibold text-white mb-2">
                    Start Date
                  </FieldTitle>
                  <Input
                    type="date"
                    value={formCreateGoal.startAt || ''}
                    onChange={(e) =>
                      setFormCreateGoal((prev) => ({
                        ...prev,
                        startAt: e.target.value,
                      }))
                    }
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 rounded-lg"
                  />
                </FieldContent>
              </div>

              <div>
                <FieldContent>
                  <FieldTitle className="text-sm font-semibold text-white mb-2">
                    Target Date
                  </FieldTitle>
                  <Input
                    type="date"
                    value={formCreateGoal.endAt || ''}
                    onChange={(e) =>
                      setFormCreateGoal((prev) => ({
                        ...prev,
                        endAt: e.target.value,
                      }))
                    }
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 rounded-lg"
                  />
                </FieldContent>
              </div>
            </div>
            <div>
              <FieldContent>
                <FieldTitle className="text-sm font-semibold text-white mb-2">
                  Card Wallet
                </FieldTitle>
                <WalletCard
                  wallet={walletData}
                  isSelected={selectWalletId === walletData.id}
                  key={walletData.id}
                  onClick={() => onSelectWalletId(walletData.id)}
                />
              </FieldContent>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPopUp(null)}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              className="flex-1 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold transition-all duration-300"
            >
              {isPending ? 'Creating...' : 'Create Goal'}
            </Button>
          </div>
        </form>
      </Field>
    </View>
  );
};

export default CreateGoalForm;
