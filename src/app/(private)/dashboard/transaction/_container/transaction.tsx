'use client';

import { useState } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import TransactionHeroSection from '@/core/section/private/transaction/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormCreateTransaction } from '@/types/form/transaction.form';
import { TransactionType } from '@/types/partial';
import { PopupInterface } from '@/types/ui';

export default function TransactionContainer() {
  const namespace = useAppNameSpase();
  const service = useServices();
  const [popUpModal, setPopUpModal] = useState<PopupInterface>(null);
  const transactionQuery = service.Transaction.query();
  const categoryQuery = service.Category.query();
  const [loadId, setLoadId] = useState<string | null>(null);
  const [selectTransaction, setSelectTransaction] = useState<TransactionType>('INCOME');
  const transactionMutation = service.Transaction.mutation.useCreate();
  const [formCreateTransaction, setFormTransaction] = useState<FormCreateTransaction>({
    amount: undefined,
    description: '',
    receiptUrl: '',
    type: selectTransaction,
  });

  const handleCreateTransaction = () => {
    if (
      !formCreateTransaction.amount ||
      !formCreateTransaction.description ||
      !formCreateTransaction.receiptUrl ||
      !formCreateTransaction.type
    ) {
      namespace.alert.toast({
        title: 'perhatian',
        message: 'colum tidak boleh kosong',
        icon: 'warning',
      });
    } else {
      transactionMutation.mutate(
        { id: loadId!, payload: formCreateTransaction },
        {
          onSuccess: () => {
            setPopUpModal(null);
            // clear form
          },
        }
      );
    }
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col overflow-x-hidden">
        <TransactionHeroSection
          transactionData={transactionQuery.transactionQuery ?? []}
          popUpModal={popUpModal}
          categoryData={categoryQuery.categoryQuery ?? []}
          setLoadId={setLoadId}
          loadId={loadId}
          setPopUpModal={setPopUpModal}
          isPending={transactionMutation.isPending}
          formCreateTransaction={formCreateTransaction}
          setFormCreateTransaction={setFormTransaction}
          selectType={selectTransaction}
          setSelectType={setSelectTransaction}
          onCreate={() => handleCreateTransaction()}
        />
      </Container>
    </SidebarLayout>
  );
}
