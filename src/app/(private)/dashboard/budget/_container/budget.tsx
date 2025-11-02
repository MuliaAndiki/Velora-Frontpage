'use client';

import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import BudgetHeroSection from '@/core/section/private/budget/hero-section';

export default function BudgetContainer() {
  return (
    <SidebarLayout>
      <main className="w-full min-h-screen flex flex-col">
        <BudgetHeroSection />
      </main>
    </SidebarLayout>
  );
}
