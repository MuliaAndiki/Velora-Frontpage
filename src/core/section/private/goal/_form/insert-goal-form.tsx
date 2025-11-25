import { X } from 'lucide-react';

import WalletCard from '@/components/partial/wallet-partial';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import View from '@/components/ui/view';
import { FormInsertGoal } from '@/types/form/goal.form';
import { IWallet } from '@/types/schema';
import { PopupInterface } from '@/types/ui';

interface InsertGoalProps {
  setPopUp: React.Dispatch<React.SetStateAction<PopupInterface>>;
  walletData: IWallet;
  formInsertGoal: FormInsertGoal;
  setFormInsertGoal: React.Dispatch<React.SetStateAction<FormInsertGoal>>;
  walletClick: (id: string) => void;
  selectWalletID: string;
  onInsert: () => void;
}

const InsertGoalForm: React.FC<InsertGoalProps> = ({
  setPopUp,
  formInsertGoal,
  setFormInsertGoal,
  walletData,
  selectWalletID,
  walletClick,
  onInsert,
}) => {
  return (
    <View className="w-full h-full">
      <Field>
        <FieldGroup>
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl">Insert Goal</h1>
            <X onClick={() => setPopUp(null)} className="cursor-pointer" />
          </div>
          <FieldContent>
            <h1 className="font-bold text-lg">Mount</h1>
            <Input
              inputMode="numeric"
              type="number"
              value={formInsertGoal.savedAmount}
              onChange={(e) =>
                setFormInsertGoal((prev) => ({
                  ...prev,
                  savedAmount: Number(e.target.value),
                }))
              }
            />
          </FieldContent>
        </FieldGroup>
        <FieldGroup>
          <FieldContent>
            <h1 className="font-bold text-lg">Wallet Card</h1>
            <WalletCard
              wallet={walletData}
              onClick={() => walletClick(walletData.id)}
              isSelected={selectWalletID === walletData.id}
            />
          </FieldContent>
        </FieldGroup>
        <FieldGroup>
          <FieldContent>
            <Button variant={'toggle'} onClick={() => onInsert()}>
              Insert
            </Button>
          </FieldContent>
        </FieldGroup>
      </Field>
    </View>
  );
};

export default InsertGoalForm;
