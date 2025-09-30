'use client';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import ReportHeroSection from '@/core/section/private/report/hero-section';

const ReportContainer = () => {
  return (
    <SidebarLayout>
      <main className="flex flex-col min-h-screen">
        <ReportHeroSection />
      </main>
    </SidebarLayout>
  );
};

export default ReportContainer;
