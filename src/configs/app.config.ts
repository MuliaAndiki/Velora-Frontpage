import {
  ClipboardMinus,
  CreditCard,
  DollarSign,
  Goal,
  Home,
  Settings,
  SquareUserRound,
} from 'lucide-react';
import React from 'react';

import { SidebarContentType } from '@/types/app';

interface AppConfig {
  name: string;
  description: string;
  logo: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    image: string;
  };
  social_media: {
    twitter: {
      url: string;
      icon: string;
    };
    instagram: {
      url: string;
      icon: string;
    };
    linkedin: {
      url: string;
      icon: string;
    };
    youtube: {
      url: string;
      icon: string;
    };
    tiktok: {
      url: string;
      icon: string;
    };
  };
}

export const appConfig: AppConfig = {
  name: 'App',
  description: 'App',
  logo: '/images/logo.png',
  metadata: {
    title: 'App',
    description: 'App',
    keywords: ['App'],
    author: 'App',
    image: 'App',
  },
  social_media: {
    twitter: {
      url: 'https://twitter.com/app',
      icon: 'hugeicons:new-twitter-rectangle',
    },
    instagram: {
      url: 'https://instagram.com/app',
      icon: 'basil:instagram-outline',
    },
    linkedin: {
      url: 'https://linkedin.com/app',
      icon: 'tabler:brand-linkedin',
    },
    youtube: {
      url: 'https://youtube.com/app',
      icon: 'mingcute:youtube-line',
    },
    tiktok: {
      url: 'https://tiktok.com/app',
      icon: 'hugeicons:tiktok',
    },
  },
};

interface NavigationMenuConfig {
  items: {
    title: string;
    href: string;
    icon?: React.ReactNode;
    description?: string;
    children?: NavigationMenuConfig['items'];
  }[];
}

export const navigationMenuConfig: NavigationMenuConfig = {
  items: [
    {
      title: 'Home',
      href: '/',
      description: 'Home',
    },
    {
      title: 'Login',
      href: '/login',
      description: 'Login',
    },
  ],
};

export const SidebarMenuData: SidebarContentType[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Transaction',
    url: '/dashboard/transaction',
    icon: CreditCard,
  },
  {
    title: 'Budget',
    url: '/dashboard/budget',
    icon: DollarSign,
  },
  {
    title: 'Goals',
    url: '/dashboard/goal',
    icon: Goal,
  },
  {
    title: 'Report',
    url: '/dashboard/report',
    icon: ClipboardMinus,
  },
  {
    title: 'Profile',
    url: '/dashboard/profile',
    icon: SquareUserRound,
  },
  {
    title: 'Setting',
    icon: Settings,
    url: '/dashboard/setting',
  },
];
