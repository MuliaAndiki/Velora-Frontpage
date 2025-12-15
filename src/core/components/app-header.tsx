import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { navigationMenuConfig } from '@/configs/app.config';
import { cn } from '@/utils/classname';

import LanguageDropdown from './language.dropdown';
import ThemeToggle from './theme-toggle';

export interface AppHeaderProps {
  t: any;
}

export default function AppHeader({ t }: AppHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm p-6 border-b transition-all duration-200',
        isScrolled ? 'border-b-border shadow-md' : 'border-b-transparent'
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon/favicon.svg"
              alt="Velora Logo"
              width={70}
              height={70}
              unoptimized
            />
            <span className="text-2xl font-bold text-orange-500 tracking-tight">Velora</span>
          </Link>
          <span className="hidden md:inline text-slate-400 font-medium ml-2">
            {t('navbar-header.title')}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <NavigationMenu>
            <NavigationMenuList>
              {navigationMenuConfig?.items?.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink href={item.href} className={navigationMenuTriggerStyle()}>
                    {t(item.title)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <LanguageDropdown />
          {/* <NotificationDropdown /> */}
        </div>
      </div>
    </nav>
  );
}
