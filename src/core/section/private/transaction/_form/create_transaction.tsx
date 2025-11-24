import { X } from 'lucide-react';

import CategoryPartial from '@/components/partial/category-partial';
import WalletCard from '@/components/partial/wallet-partial';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import View from '@/components/ui/view';
import { CategoryType, TransactionPartialType } from '@/types/components';
import { FormCreateTransaction } from '@/types/form/transaction.form';
import { TransactionType } from '@/types/partial';

interface TransactionFormModalProps {
  selectType: TransactionType;
  setSelectType: React.Dispatch<React.SetStateAction<TransactionType>>;
  formCreateTransaction: FormCreateTransaction;
  setFormCreateTransaction: React.Dispatch<React.SetStateAction<FormCreateTransaction>>;
  categoryData: CategoryType[];
  walletsData: any[];
  selectedWalletId: string;
  onSelectWallet: (id: string) => void;
  loadId: string | null;
  setLoadId: React.Dispatch<React.SetStateAction<string | null>>;
  onCreate: () => void;
  onUpdate?: () => void;
  isPending: boolean;
  onClose: () => void;
  isEdit?: boolean;
  selectedTransaction?: TransactionPartialType | null;
}

const TransactionFormModal: React.FC<TransactionFormModalProps> = ({
  selectType,
  setSelectType,
  formCreateTransaction,
  setFormCreateTransaction,
  categoryData,
  walletsData,
  selectedWalletId,
  onSelectWallet,
  loadId,
  setLoadId,
  onCreate,
  onUpdate,
  isPending,
  onClose,
  isEdit,
  selectedTransaction,
}) => {
  return (
    <View className="w-full h-full">
      <div className="flex justify-center items-center flex-col">
        <div className="flex w-full justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-white">
            {isEdit ? 'Edit Transaction' : 'Create Transaction'}
          </h1>
          <X onClick={onClose} className="cursor-pointer hover:scale-110 transition-transform" />
        </div>

        {!isEdit && (
          <div className="grid w-full grid-cols-2 gap-4 mb-4">
            <Button
              className={`w-full transition-all ${
                selectType === 'INCOME'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              onClick={() => {
                setSelectType('INCOME');
                setFormCreateTransaction((prev) => ({ ...prev, type: 'INCOME' }));
              }}
            >
              Income
            </Button>

            <Button
              className={`w-full transition-all ${
                selectType === 'EXPENSE'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              onClick={() => {
                setSelectType('EXPENSE');
                setFormCreateTransaction((prev) => ({ ...prev, type: 'EXPENSE' }));
              }}
            >
              Expense
            </Button>
          </div>
        )}

        {(selectType === 'INCOME' || selectType === 'EXPENSE') && (
          <View className="w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isEdit && onUpdate) {
                  onUpdate();
                } else {
                  onCreate();
                }
              }}
              className="space-y-4"
            >
              {!isEdit && walletsData && walletsData.length > 0 && (
                <div className="w-full border border-slate-700 p-4 rounded-lg space-y-2">
                  <p className="text-slate-300 text-sm font-semibold mb-2">Select Wallet</p>
                  <div className="grid grid-cols-2 gap-3">
                    {walletsData.map((wallet) => (
                      <WalletCard
                        key={wallet.id}
                        wallet={wallet}
                        isSelected={selectedWalletId === wallet.id}
                        onClick={() => onSelectWallet(wallet.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="w-full border border-slate-700 p-4 rounded-lg space-y-2">
                <p className="text-slate-300 text-sm font-semibold mb-2">Select Category</p>
                {categoryData
                  .filter((item) => item.type === selectType)
                  .map((item) => (
                    <CategoryPartial
                      data={item}
                      loadId={loadId}
                      setLoadId={setLoadId}
                      key={item.id}
                    />
                  ))}
              </div>

              <div>
                <label className="text-slate-300 text-sm font-semibold">Amount :</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={formCreateTransaction.amount || ''}
                  onChange={(e) =>
                    setFormCreateTransaction((prev) => ({
                      ...prev,
                      amount: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-semibold">Description :</label>
                <Input
                  placeholder="Enter description"
                  value={formCreateTransaction.description}
                  onChange={(e) =>
                    setFormCreateTransaction((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-semibold">Receipt URL :</label>
                <Input
                  placeholder="Enter receipt URL"
                  value={formCreateTransaction.receiptUrl}
                  onChange={(e) =>
                    setFormCreateTransaction((prev) => ({
                      ...prev,
                      receiptUrl: e.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  {isPending ? 'Saving...' : isEdit ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </View>
        )}
      </div>
    </View>
  );
};

export default TransactionFormModal;
