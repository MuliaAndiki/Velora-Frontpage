'use client';

import { useState } from 'react';

import Container from '@/components/ui/container';
import { ButtonIncome, ExpenseChartData, IncomeChartData } from '@/configs/partial.config';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DashboardHeroSection from '@/core/section/private/dashboard/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormCreateWallet } from '@/types/form/wallet.form';
import { PopupInterface } from '@/types/ui';
import { fileToBase64 } from '@/utils/base64';

export default function DashboardContainer() {
  const namespace = useAppNameSpase();
  const service = useServices();
  const [formCreateWallet, setFormCreateWallet] = useState<FormCreateWallet>({
    name: '',
  });

  const walletMutation = service.Wallet.mutation.useCreate();
  const [popupModal, setPopupModal] = useState<PopupInterface>(null);
  const category = useServices().Category.mutation.useCreateCategory();

  const handleCreateWallet = () => {
    if (!formCreateWallet.name) {
      namespace.alert.toast({
        title: 'warning',
        message: 'colum tidak boleh kosong',
        icon: 'warning',
      });
    } else {
      walletMutation.mutate(formCreateWallet, {
        onSuccess: () => {
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
          onWallet={() => handleCreateWallet()}
          setPopUpModal={setPopupModal}
          formCreateWallet={formCreateWallet}
          setFormCreateWallet={setFormCreateWallet}
          isPending={category.isPending}
        />
      </Container>
    </SidebarLayout>
  );
}
