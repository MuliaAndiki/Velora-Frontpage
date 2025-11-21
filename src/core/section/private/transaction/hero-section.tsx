import { CircleDot, X } from 'lucide-react';

import CategoryPartial from '@/components/partial/category-partial';
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
import { PopupInterface } from '@/types/ui';

interface TrasanctionProps {
  transactionData: TransactionPartialType[];
  categoryData: CategoryType[];
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
  loadId,
  setLoadId,
  onCreate,
}) => {
  return (
    <View>
      <div className="w-full flex flex-col min-h-screen overflow-hidden justify-start items-start p-4 ">
        <div className="flex items-start flex-col mb-3 ">
          <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 mb-3">
            All Transactions
          </h1>
          <p className="text-slate-400 text-lg">Track and manege your financial transaction</p>
        </div>
        <div className="grid grid-cols-3 grid-rows-1 gap-3 w-full">
          {/* setup */}
          {/* <GoalHeader data={}/> */}
        </div>
        <Card className="w-full">
          <CardContent className="w-full space-y-2 gap-2 ">
            <div className="w-full flex gap-4">
              <Input className="w-full" placeholder="Search Transaction...." />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>All Type</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Date</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Newest First" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>First</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <p className="text-slate-400 font-light">Showing 5 of 5 transaction</p>
          </CardContent>
        </Card>
        <div className="w-full">
          {transactionData.map((items, key) => (
            <TransactionPartial key={key} data={items} />
          ))}
        </div>
      </div>
      <div className="fixed bottom-8 right-8 z-50   px-6 py-4 rounded-full shadow-2xl  ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <CircleDot size={200} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuLabel className="text-lg font-bold">Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-md text-accent-foreground font-semibold"
                onClick={() => setPopUpModal('transaction')}
              >
                Create
              </DropdownMenuItem>
              <DropdownMenuItem className="text-md text-destructive font-semibold">
                Delete All
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <PopUp isOpen={popUpModal === 'transaction'} onClose={() => setPopUpModal(null)}>
        <View className="w-full h-full">
          <div className="flex justify-center items-center flex-col">
            <div className="flex w-full justify-between items-center">
              <h1 className="text-lg">Transaction</h1>
              <X onClick={() => setPopUpModal(null)} className="cursor-pointer" />
            </div>
            <div className="grid w-full grid-cols-2 grid-rows-1 gap-4 mt-2">
              <Button className="w-full" variant="outline" onClick={() => setSelectType('INCOME')}>
                Income
              </Button>
              <Button className="w-full" variant="outline" onClick={() => setSelectType('EXPENSE')}>
                Expense
              </Button>
            </div>
            {selectType === 'INCOME' && (
              <View className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onCreate();
                  }}
                >
                  <div className="w-full border p-4 my-4 rounded-lg space-y-2 ">
                    {categoryData
                      .filter((item) => item.type === 'INCOME')
                      .map((item, key) => (
                        <CategoryPartial
                          data={item}
                          loadId={loadId}
                          setLoadId={setLoadId}
                          key={key}
                        />
                      ))}
                  </div>
                  <div>
                    <h1 className="text-lg text-slate-400">Amount :</h1>
                    <Input
                      value={formCreateTransaction.amount}
                      onChange={(e) =>
                        setFormCreateTransaction((prev) => ({
                          ...prev,
                          amount: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <h1 className="text-lg text-slate-400">Description :</h1>
                    <Input
                      value={formCreateTransaction.description}
                      onChange={(e) =>
                        setFormCreateTransaction((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <h1 className="text-lg text-slate-400">receiptUrl :</h1>
                    <Input
                      value={formCreateTransaction.receiptUrl}
                      onChange={(e) =>
                        setFormCreateTransaction((prev) => ({
                          ...prev,
                          receiptUrl: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className=" my-2 ">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full"
                      variant={'toggle'}
                    >
                      {isPending ? 'wait' : 'create'}
                    </Button>
                  </div>
                </form>
              </View>
            )}

            {selectType === 'EXPENSE' && (
              <View className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onCreate();
                  }}
                >
                  <div className="w-full border p-4 my-4 rounded-lg space-y-2 ">
                    {categoryData
                      .filter((item) => item.type === 'EXPENSE')
                      .map((item, key) => (
                        <CategoryPartial
                          data={item}
                          loadId={loadId}
                          setLoadId={setLoadId}
                          key={key}
                        />
                      ))}
                  </div>
                  <div>
                    <h1 className="text-lg text-slate-400">Amount :</h1>
                    <Input
                      value={formCreateTransaction.amount}
                      onChange={(e) =>
                        setFormCreateTransaction((prev) => ({
                          ...prev,
                          amount: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <h1 className="text-lg text-slate-400">Description :</h1>
                    <Input
                      value={formCreateTransaction.description}
                      onChange={(e) =>
                        setFormCreateTransaction((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <h1 className="text-lg text-slate-400">receiptUrl :</h1>
                    <Input
                      value={formCreateTransaction.receiptUrl}
                      onChange={(e) =>
                        setFormCreateTransaction((prev) => ({
                          ...prev,
                          receiptUrl: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className=" my-2 ">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full"
                      variant={'toggle'}
                    >
                      {isPending ? 'wait' : 'create'}
                    </Button>
                  </div>
                </form>
              </View>
            )}
          </div>
        </View>
      </PopUp>
    </View>
  );
};

export default TransactionHeroSection;
