import React from 'react';

import BudgerChart from '@/components/chart/budget-chart';
import CategoryChart from '@/components/chart/category-chart';
import IncomeChart from '@/components/chart/incone-chart';
import DashboardCard from '@/components/dashboard-card';
import RecentCard from '@/components/recent-card';
import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Field, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import PopUp from '@/components/ui/pop-up';
import View from '@/components/ui/view';
import { BarchartIncomeConfig, PiechartConfig } from '@/configs/chart.config';
import { DashboardCardData, RecentCardData } from '@/configs/components.config';
import { BudgetCardData } from '@/configs/components.config';
import { FormCreateCategory } from '@/types/form/category.form';
import { ExpenseChartType, InconeChartType, InconeType } from '@/types/partial';
import { PopupInterface } from '@/types/ui';

interface DashboardProps {
  popUpModal: PopupInterface;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
  // dumy
  ButtonIncome: InconeType[];
  ExpenseChartData: ExpenseChartType[];
  IncomeChartData: InconeChartType[];
  formCreateCategory: FormCreateCategory;
  setFromCreateCategory: React.Dispatch<React.SetStateAction<FormCreateCategory>>;
  isPending: boolean;
  onAddCategory: () => void;
}

const DashboardHeroSection: React.FC<DashboardProps> = ({
  ButtonIncome,
  ExpenseChartData,
  IncomeChartData,
  popUpModal,
  setPopUpModal,
  formCreateCategory,
  setFromCreateCategory,
  isPending,
  onAddCategory,
}) => {
  return (
    <View className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden  ">
      <Box className="flex-1 w-full  mx-auto relative z-10 p-6 lg:p-8">
        <Box className="mb-8 text-center">
          <Box className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 bg-opacity-50 backdrop-blur-sm border  rounded-full mb-4">
            <span className=" text-lg font-bold text-orange-400">Velora</span>
            <span className=" text-sm">Your Financial Dashboard</span>
          </Box>
          <h1 className="text-4xl font-bold  mb-2">Financial Dashboard</h1>
          <p className="">Overview of your financial activities</p>
        </Box>
        <Box className="w-full h-full flex justify-between items-center gap-4 ">
          {DashboardCardData.map((items, key) => (
            <DashboardCard key={key} data={items} />
          ))}
        </Box>
        <Box className="grid grid-cols-2 grid-rows-1 gap-4">
          <Box className="w-full my-4">
            <IncomeChart
              ButtonIncome={ButtonIncome}
              IncomeChartData={IncomeChartData}
              BarchartIncomeConfig={BarchartIncomeConfig}
            />
          </Box>
          <Box className="w-full my-4">
            <CategoryChart
              ExpenseChartData={ExpenseChartData}
              PiechartConfig={PiechartConfig}
              ButtonIncome={ButtonIncome}
            />
          </Box>
          <Box className="w-full my-2 ">
            <RecentCard RecentCardData={RecentCardData} />
          </Box>
          <Box className="w-full my-2">
            <BudgerChart BudgetData={BudgetCardData} />
          </Box>
        </Box>
      </Box>

      <Button
        onClick={() => setPopUpModal('categoory')}
        className="fixed bottom-8 right-8 z-50   px-6 py-4 rounded-full shadow-2xl "
      >
        <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
        <span className="font-semibold">Add Category</span>
      </Button>
      <PopUp isOpen={popUpModal === 'categoory'} onClose={() => setPopUpModal(null)}>
        <View className="w-full h-full">
          <Box className="w-full flex justify-center items-center flex-col">
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                onAddCategory();
              }}
            >
              <Field>
                <FieldTitle>Name Category :</FieldTitle>
                <Input
                  value={formCreateCategory.name}
                  onChange={(e) =>
                    setFromCreateCategory((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <Button variant={'outline'} type="submit" disabled={isPending}>
                  {isPending ? 'Wait' : 'Add'}
                </Button>
              </Field>
            </form>
          </Box>
        </View>
      </PopUp>
    </View>
  );
};

export default DashboardHeroSection;
