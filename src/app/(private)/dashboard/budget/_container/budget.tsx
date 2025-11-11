'use client';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import BudgetHeroSection from '@/core/section/private/budget/hero-section';

export default function BudgetContainer() {
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <BudgetHeroSection />
      </Container>
    </SidebarLayout>
  );
}
