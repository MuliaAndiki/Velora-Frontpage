import { CircleDot, X } from 'lucide-react';

import GoalHeader from '@/components/goal-header';
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
import { TransactionPartialType } from '@/types/components';
import { PopupInterface } from '@/types/ui';

interface TrasanctionProps {
  transactionData: TransactionPartialType[];
  popUpModal: PopupInterface;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
}

const TransactionHeroSection: React.FC<TrasanctionProps> = ({
  transactionData,
  popUpModal,
  setPopUpModal,
}) => {
  return (
    <View>
      <div className="w-full flex flex-col min-h-screen overflow-hidden justify-start items-start p-4">
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
          <CardContent className="w-full flex  gap-4">
            <Input className="w-full" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
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
                <SelectValue placeholder="All Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
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
                <SelectValue placeholder="All Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
      {/* initial setup */}
      <PopUp isOpen={popUpModal === 'transaction'} onClose={() => setPopUpModal(null)}>
        <View className="w-full h-full">
          <div className="flex justify-center items-center flex-col">
            <div className="flex w-full justify-between items-center">
              <h1 className="text-lg">transaction</h1>
              <X onClick={() => setPopUpModal(null)} className="cursor-pointer" />
            </div>
          </div>
        </View>
      </PopUp>
    </View>
  );
};

export default TransactionHeroSection;
