import { CircleDot } from 'lucide-react';

import TransactionPartial from '@/components/partial/transaction-partial';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import PopUp from '@/components/ui/pop-up';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import View from '@/components/ui/view';
import { CategoryType, TransactionPartialType } from '@/types/components';
import { FormCreateTransaction } from '@/types/form/transaction.form';
import { TransactionType } from '@/types/partial';
import { IWallet } from '@/types/schema';
import { PopupInterface } from '@/types/ui';

import TransactionFormModal from './_form/create_transaction';

interface TrasanctionProps {
  transactionData: TransactionPartialType[];
  categoryData: CategoryType[];
  walletsData: IWallet;
  selectedWalletId: string;
  onSelectWallet: (walletId: string) => void;
  popUpModal: PopupInterface;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
  formCreateTransaction: FormCreateTransaction;
  setFormCreateTransaction: React.Dispatch<React.SetStateAction<FormCreateTransaction>>;
  isPending: boolean;
  selectType: TransactionType;
  setSelectType: React.Dispatch<React.SetStateAction<TransactionType>>;
  loadId: string | null;
  setLoadId: React.Dispatch<React.SetStateAction<string | null>>;
  onCreate: () => void;
  onUpdate?: () => void;
  onEdit: (transaction: TransactionPartialType) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filterType: 'ALL' | 'INCOME' | 'EXPENSE';
  setFilterType: React.Dispatch<React.SetStateAction<'ALL' | 'INCOME' | 'EXPENSE'>>;
  sortBy: 'newest' | 'oldest';
  setSortBy: React.Dispatch<React.SetStateAction<'newest' | 'oldest'>>;
  selectedTransactionForEdit?: TransactionPartialType | null;
  onCloseModal: () => void;
}

const TransactionHeroSection: React.FC<TrasanctionProps> = ({
  transactionData,
  popUpModal,
  setPopUpModal,
  isPending,
  formCreateTransaction,
  setFormCreateTransaction,
  selectType,
  setSelectType,
  categoryData,
  walletsData,
  selectedWalletId,
  onSelectWallet,
  loadId,
  setLoadId,
  onCreate,
  onUpdate,
  onEdit,
  onDelete,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  sortBy,
  setSortBy,
  selectedTransactionForEdit,
  onCloseModal,
}) => {
  return (
    <View>
      <div className="w-full flex flex-col min-h-screen overflow-hidden justify-start items-start p-4 ">
        <div className="flex items-start flex-col mb-3 ">
          <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 mb-3">
            All Transactions
          </h1>
          <p className="text-slate-400 text-lg">Track and manage your financial transactions</p>
        </div>

        <Card className="w-full mb-6">
          <CardContent className="w-full space-y-2 gap-2 pt-6">
            <div className="w-full flex gap-4">
              <Input
                className="w-full"
                placeholder="Search by description or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter by Type</SelectLabel>
                    <SelectItem value="ALL">All Type</SelectItem>
                    <SelectItem value="INCOME">Income</SelectItem>
                    <SelectItem value="EXPENSE">Expense</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort Order</SelectLabel>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <p className="text-slate-400 font-light">
              Showing {transactionData.length} of {transactionData.length} transactions
            </p>
          </CardContent>
        </Card>

        <div className="w-full space-y-3">
          {transactionData.length > 0 ? (
            transactionData.map((items) => (
              <div key={items.id} className="relative">
                <TransactionPartial
                  data={items}
                  onEdit={() => onEdit(items)}
                  onDelete={() => onDelete(items.id)}
                />
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center py-8">
              <p className="text-slate-400 text-lg">No transactions found</p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50 px-6 py-4 rounded-full shadow-2xl">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg">
              <CircleDot size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuLabel className="text-lg font-bold">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-md text-accent-foreground font-semibold"
                onClick={() => {
                  setPopUpModal('transaction');
                  setSelectType('EXPENSE');
                }}
              >
                Create
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <PopUp
        isOpen={popUpModal === 'transaction' || popUpModal === 'edit-transaction'}
        onClose={onCloseModal}
      >
        <TransactionFormModal
          selectType={selectType}
          setSelectType={setSelectType}
          formCreateTransaction={formCreateTransaction}
          setFormCreateTransaction={setFormCreateTransaction}
          categoryData={categoryData}
          walletsData={walletsData}
          selectedWalletId={selectedWalletId}
          onSelectWallet={onSelectWallet}
          loadId={loadId}
          setLoadId={setLoadId}
          onCreate={onCreate}
          onUpdate={onUpdate}
          isPending={isPending}
          onClose={onCloseModal}
          isEdit={popUpModal === 'edit-transaction'}
          selectedTransaction={selectedTransactionForEdit}
        />
      </PopUp>
    </View>
  );
};

export default TransactionHeroSection;
