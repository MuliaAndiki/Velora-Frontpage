'use client';

import { useState } from 'react';

import Container from '@/components/ui/container';
import { ButtonIncome, ExpenseChartData, IncomeChartData } from '@/configs/partial.config';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DashboardHeroSection from '@/core/section/private/dashboard/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormCreateCategory } from '@/types/form/category.form';
import { PopupInterface } from '@/types/ui';
import { fileToBase64 } from '@/utils/base64';

export default function DashboardContainer() {
  const namespace = useAppNameSpase();
  const [formCreateCategory, setFromCreateCategory] = useState<FormCreateCategory>({
    name: '',
    cate_avaUrl: '',
  });
  const [popupModal, setPopupModal] = useState<PopupInterface>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const category = useServices().Category.mutation.useCreateCategory();

  const handleChangePict = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setFromCreateCategory((prev) => ({
        ...prev,
        cate_avaUrl: base64,
      }));
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  };

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
          preview={preview}
          onChangePict={handleChangePict}
          setPreview={setPreview}
        />
      </Container>
    </SidebarLayout>
  );
}
