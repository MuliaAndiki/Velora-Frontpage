import { Label } from '@radix-ui/react-label';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import BudgerChart from '@/components/chart/budget-chart';
import CategoryChart from '@/components/chart/category-chart';
import IncomeChart from '@/components/chart/incone-chart';
import DashboardCard from '@/components/dashboard-card';
import RecentCard from '@/components/recent-card';
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
import UploadsTrigger from '@/utils/uploadtrigger';

interface DashboardProps {
  popUpModal: PopupInterface;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
  preview: string | null;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
  // dumy
  ButtonIncome: InconeType[];
  ExpenseChartData: ExpenseChartType[];
  IncomeChartData: InconeChartType[];
  formCreateCategory: FormCreateCategory;
  setFromCreateCategory: React.Dispatch<React.SetStateAction<FormCreateCategory>>;
  isPending: boolean;
  onAddCategory: () => void;
  onChangePict: (e: any) => void;
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
  onChangePict,
  preview,
  setPreview,
}) => {
  return (
    <View className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden  ">
      <div className="flex-1 w-full  mx-auto relative z-10 p-6 lg:p-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 bg-opacity-50 backdrop-blur-sm border  rounded-full mb-4">
            <span className=" text-lg font-bold text-orange-400">Velora</span>
            <span className=" text-sm">Your Financial Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold  mb-2">Financial Dashboard</h1>
          <p className="">Overview of your financial activities</p>
        </div>
        <div className="w-full h-full flex justify-between items-center gap-4 ">
          {DashboardCardData.map((items, key) => (
            <DashboardCard key={key} data={items} />
          ))}
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
          <div className="w-full my-4">
            <IncomeChart
              ButtonIncome={ButtonIncome}
              IncomeChartData={IncomeChartData}
              BarchartIncomeConfig={BarchartIncomeConfig}
            />
          </div>
          <div className="w-full my-4">
            <CategoryChart
              ExpenseChartData={ExpenseChartData}
              PiechartConfig={PiechartConfig}
              ButtonIncome={ButtonIncome}
            />
          </div>
          <div className="w-full my-2 ">
            <RecentCard RecentCardData={RecentCardData} />
          </div>
          <div className="w-full my-2">
            <BudgerChart BudgetData={BudgetCardData} />
          </div>
        </div>
      </div>

      <Button
        onClick={() => setPopUpModal('category')}
        className="fixed bottom-8 right-8 z-50   px-6 py-4 rounded-full shadow-2xl "
      >
        <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
        <span className="font-semibold">Add Category</span>
      </Button>
      <PopUp isOpen={popUpModal === 'category'} onClose={() => setPopUpModal(null)}>
        <View className="w-full h-full">
          <div className="w-full flex justify-center items-center flex-col">
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
                <div className="border w-full border-dashed rounded-lg h-full">
                  <UploadsTrigger
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => onChangePict(e)}
                  >
                    <Button type="button" variant={'ghost'} className="w-full h-full flex flex-col">
                      <ImagePlus />
                      <Label className="text-lg font-semibold">Upload Foto Category</Label>
                    </Button>
                  </UploadsTrigger>
                </div>
                {preview && (
                  <div className="w-full h-full mt-3  rounded-lg p-2 flex justify-center flex-col items-center space-y-2 ">
                    <Image
                      alt="preview"
                      src={preview}
                      width={150}
                      height={150}
                      className="aspect-square rounded-lg object-cover"
                    />
                    <Button variant={'destructive'} onClick={() => setPreview(null)}>
                      Hapus Photo
                    </Button>
                  </div>
                )}
                <Button variant={'outline'} type="submit" disabled={isPending}>
                  {isPending ? 'Wait' : 'Add'}
                </Button>
              </Field>
            </form>
          </div>
        </View>
      </PopUp>
    </View>
  );
};

export default DashboardHeroSection;
