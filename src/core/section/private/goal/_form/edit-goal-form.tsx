import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldSeparator, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import View from '@/components/ui/view';
import { FormCreateGoal } from '@/types/form/goal.form';
import { PopupInterface } from '@/types/ui';

interface EditGoalFormProps {
  onEdit: () => void;
  formEditGoal: FormCreateGoal;
  setFormEditGoal: React.Dispatch<React.SetStateAction<FormCreateGoal>>;
  isPending: boolean;
  setPopUp: React.Dispatch<React.SetStateAction<PopupInterface>>;
}

const EditGoalForm: React.FC<EditGoalFormProps> = ({
  formEditGoal,
  onEdit,
  setFormEditGoal,
  isPending,
  setPopUp,
}) => {
  return (
    <View className="w-full h-full">
      <Field>
        <div className="flex justify-between items-center mb-6">
          <div>
            <FieldTitle className="text-2xl font-bold text-white">Edit Goal</FieldTitle>
            <p className="text-slate-400 text-sm mt-1">Update your goal details</p>
          </div>
          <X
            onClick={() => setPopUp(null)}
            className="cursor-pointer hover:scale-110 transition-transform text-slate-400"
            size={24}
          />
        </div>
        <FieldSeparator />

        <form
          className="w-full mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onEdit();
          }}
        >
          <div>
            <FieldContent>
              <FieldTitle className="text-sm font-semibold text-white mb-2">Goal Name</FieldTitle>
              <Input
                defaultValue={formEditGoal.name}
                onChange={(e) =>
                  setFormEditGoal((prev) => ({
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
                  defaultValue={formEditGoal.targetAmount || ''}
                  type="number"
                  inputMode="numeric"
                  onChange={(e) =>
                    setFormEditGoal((prev) => ({
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
                  Amount Saved
                </FieldTitle>
                <Input
                  defaultValue={formEditGoal.savedAmount || ''}
                  type="number"
                  inputMode="numeric"
                  onChange={(e) =>
                    setFormEditGoal((prev) => ({
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
                  defaultValue={formEditGoal.startAt || ''}
                  type="date"
                  onChange={(e) =>
                    setFormEditGoal((prev) => ({
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
                  defaultValue={formEditGoal.endAt || ''}
                  type="date"
                  onChange={(e) =>
                    setFormEditGoal((prev) => ({
                      ...prev,
                      endAt: e.target.value,
                    }))
                  }
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 rounded-lg"
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
              {isPending ? 'Updating...' : 'Update Goal'}
            </Button>
          </div>
        </form>
      </Field>
    </View>
  );
};

export default EditGoalForm;
