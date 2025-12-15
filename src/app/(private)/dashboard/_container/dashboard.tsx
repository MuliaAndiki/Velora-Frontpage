'use client';

import { useState } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DashboardHeroSection from '@/core/section/private/dashboard/hero-section';
import { useBudgetData } from '@/hooks/mutation/budget/query';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormCreateWallet } from '@/types/form/wallet.form';
import { PopupInterface } from '@/types/ui';

export default function DashboardContainer() {
  const namespace = useAppNameSpase();
  const service = useServices();
  const [formCreateWallet, setFormCreateWallet] = useState<FormCreateWallet>({
    name: '',
  });

  const walletMutation = service.Wallet.mutation.useCreate();
  const transactionQuery = service.Transaction.query();
  const walletQuery = service.Wallet.query();
  const budgetQuery = useBudgetData();
  const [popupModal, setPopupModal] = useState<PopupInterface>(null);

  const handleCreateWallet = () => {
    if (!formCreateWallet.name) {
      namespace.alert.toast({
        title: 'warning',
        message: 'colum tidak boleh kosong/empy dll',
        icon: 'warning',
      });
    } else {
      walletMutation.mutate(formCreateWallet, {
        onSuccess: () => {
          setPopupModal(null);
          setFormCreateWallet({ name: '' });
        },
      });
    }
  };
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <DashboardHeroSection
          transactions={transactionQuery.transactionQuery ?? []}
          isLoading={transactionQuery.isLoading}
          wallet={walletQuery.walletQuery}
          t={namespace.t}
          budgets={budgetQuery.getBudgets}
          popUpModal={popupModal}
          onWallet={() => handleCreateWallet()}
          setPopUpModal={setPopupModal}
          formCreateWallet={formCreateWallet}
          setFormCreateWallet={setFormCreateWallet}
          isPending={walletMutation.isPending}
        />
      </Container>
    </SidebarLayout>
  );
}
