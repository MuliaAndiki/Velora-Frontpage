'use client';

import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import TransactionHeroSection from '@/core/section/private/transaction/hero-section';

export default function TransactionContainer() {
  return (
    <SidebarLayout>
      <main className="">
        <TransactionHeroSection />
      </main>
    </SidebarLayout>
  );
}
