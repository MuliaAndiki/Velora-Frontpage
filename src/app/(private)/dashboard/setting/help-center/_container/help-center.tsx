import { HelpCenterData } from '@/configs/app.config';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import HelpCenterHeroSection from '@/core/section/private/help-center/help-center-hero-section';

const HelpCenterContainer = () => {
  return (
    <SidebarLayout>
      <main className="w-full min-h-screen flex flex-col overflow-x-hidden">
        <HelpCenterHeroSection helpCenterData={HelpCenterData ?? []} />
      </main>
    </SidebarLayout>
  );
};

export default HelpCenterContainer;
