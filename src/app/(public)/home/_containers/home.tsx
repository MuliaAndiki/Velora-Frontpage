'use client';
import { themeConfig } from '@/configs/theme.config';
import NavLayout from '@/core/layouts/nav.layout';
import { useTheme } from '@/core/providers/theme.provider';
import LandingHeroSection from '@/core/section/public/hero-section';
import Container from '@/components/ui/container'; 
import Box from '@/components/ui/box';

export default function ContainerHome() {
  const { theme } = useTheme();

  return (
    <NavLayout>
      <Container className={`container  mx-auto bg-[${themeConfig[theme].primary.background}]`}>
        <Box className="flex flex-col items-center justify-center h-screen">
          <LandingHeroSection />
        </Box>
      </Container>
    </NavLayout>
  );
}
