'use client';

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import TransactionHeroSection from '@/core/section/private/transaction/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { PopupInterface } from '@/types/ui';
import { FormCreateTransaction } from '@/types/form/transaction.form';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TransactionType } from '@/types/partial';

export default function TransactionContainer() {
  const namespace = useAppNameSpase();
  const [popUpModal, setPopUpModal] = useState<PopupInterface>(null);
  const transactionAll = useServices().Transaction.query();
  const categoryAll = useServices().Category.query();
  const [loadId, setLoadId] = useState<string | null>(null);
  const [selectTransaction, setSelectTransaction] = useState<TransactionType>('INCOME');
  const transactionCreateExpense = useServices().Transaction.mutation.useCreateExpense();
  const transactionCreateIncome = useServices().Transaction.mutation.useCreateIncome();
  const [formCreateTransaction, setFormTransaction] = useState<FormCreateTransaction>({
    amount: undefined,
    description: '',
    receiptUrl: '',
    type: selectTransaction,
  });

  const onCreateTransaction = () => {
    if (selectTransaction === 'INCOME') {
      return transactionCreateIncome.mutate(formCreateTransaction);
    } else {
      transactionCreateExpense.mutate({
        payload: formCreateTransaction,
        id: loadId!,
      });
    }
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col overflow-x-hidden">
        <TransactionHeroSection
          transactionData={transactionAll.transactionQuery ?? []}
          popUpModal={popUpModal}
          categoryData={categoryAll.categoryQuery ?? []}
          setLoadId={setLoadId}
          loadId={loadId}
          setPopUpModal={setPopUpModal}
          isPending={transactionCreateExpense.isPending}
          onCreateTransacntion={() => onCreateTransaction()}
          formCreateTransaction={formCreateTransaction}
          setFormCreateTransaction={setFormTransaction}
          selectType={selectTransaction}
          setSelectType={setSelectTransaction}
        />
      </Container>
    </SidebarLayout>
  );
}
