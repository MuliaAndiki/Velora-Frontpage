'use client';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import DashboardHeroSection from '@/core/section/private/dashboard/hero-section';
export default function DashboardContainer() {
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <DashboardHeroSection />
      </Container>
    </SidebarLayout>
  );
}
