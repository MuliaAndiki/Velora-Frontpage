import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import AboutHeroSection from '@/core/section/private/about/hero-section';
const AboutContainer = () => {
  return (
    <SidebarLayout>
      <Container className="w-full flex min-h-full flex-col">
        <AboutHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default AboutContainer;
