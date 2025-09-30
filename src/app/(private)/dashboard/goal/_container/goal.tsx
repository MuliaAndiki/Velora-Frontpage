import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import GoalHeroSection from '@/core/section/private/goal/hero-section';

const GoalContainer = () => {
  return (
    <SidebarLayout>
      <main className="w-full min-h-screen flex flex-col">
        <GoalHeroSection />
      </main>
    </SidebarLayout>
  );
};

export default GoalContainer;
