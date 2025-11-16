'use client';

import { useState } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import TransactionHeroSection from '@/core/section/private/transaction/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { PopupInterface } from '@/types/ui';

export default function TransactionContainer() {
  const [popUpModal, setPopUpModal] = useState<PopupInterface>(null);
  const transactionAll = useServices().Transaction.query();
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <TransactionHeroSection
          transactionData={transactionAll.transactionQuery ?? []}
          popUpModal={popUpModal}
          setPopUpModal={setPopUpModal}
        />
      </Container>
    </SidebarLayout>
  );
}
