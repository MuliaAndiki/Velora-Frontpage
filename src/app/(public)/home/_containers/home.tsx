'use client';
import { themeConfig } from '@/configs/theme.config';
import NavLayout from '@/core/layouts/nav.layout';
import { useTheme } from '@/core/providers/theme.provider';
import LandingHeroSection from '@/core/section/public/hero-section';

export default function ContainerHome() {
  const { theme } = useTheme();

  return (
    <NavLayout>
      <main className={`container  mx-auto bg-[${themeConfig[theme].primary.background}]`}>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="absolute top-0 left-1/4 w-86 h-86 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-86 h-86 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <LandingHeroSection />
        </div>
      </main>
    </NavLayout>
  );
}
