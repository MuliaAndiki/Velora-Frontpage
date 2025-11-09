'use client';
import Container from '@/components/ui/container';
import { themeConfig } from '@/configs/theme.config';
import NavLayout from '@/core/layouts/nav.layout';
import { useTheme } from '@/core/providers/theme.provider';
import LandingHeroSection from '@/core/section/public/hero-section';

export default function ContainerHome() {
  const { theme } = useTheme();

  return (
    <NavLayout>
      <Container className={`container  mx-auto bg-[${themeConfig[theme].primary.background}]`}>
        <div className="flex flex-col items-center justify-center h-screen">
          <LandingHeroSection />
        </div>
      </Container>
    </NavLayout>
  );
}
