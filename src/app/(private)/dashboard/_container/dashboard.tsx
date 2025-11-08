'use client';

import { useState } from 'react';

import Container from '@/components/ui/container';
import { ButtonIncome, ExpenseChartData, IncomeChartData } from '@/configs/partial.config';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DashboardHeroSection from '@/core/section/private/dashboard/hero-section';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormCreateCategory } from '@/types/form/category.form';
import { PopupInterface } from '@/types/ui';

export default function DashboardContainer() {
  const namespace = useAppNameSpase();
  const [formCreateCategory, setFromCreateCategory] = useState<FormCreateCategory>({
    name: '',
  });
  const [popupModal, setPopupModal] = useState<PopupInterface>(null);
  const category = namespace.serviceApp.Category.mutation.useCreateCategory();

  const handleAddCategory = () => {
    if (!formCreateCategory.name) {
      namespace.alert.toast({
        title: 'Warning',
        message: 'Colom Nama Tidak Boleh Kosong',
        icon: 'warning',
      });
      return;
    } else {
      category.mutate(formCreateCategory, {
        onSuccess: () => {
          namespace.router.push('#');
          setPopupModal(null);
        },
      });
    }
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <DashboardHeroSection
          ButtonIncome={ButtonIncome}
          ExpenseChartData={ExpenseChartData}
          IncomeChartData={IncomeChartData}
          popUpModal={popupModal}
          setPopUpModal={setPopupModal}
          formCreateCategory={formCreateCategory}
          setFromCreateCategory={setFromCreateCategory}
          isPending={category.isPending}
          onAddCategory={() => handleAddCategory()}
        />
      </Container>
    </SidebarLayout>
  );
}
