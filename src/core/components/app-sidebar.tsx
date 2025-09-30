'use client';

import { ClipboardMinus, CreditCard, DollarSign, Goal, Home, SquareUserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/classname';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { kebabCaseToWords } from '@/utils/string.format';

// Menu items with proper routes
const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Transaction',
    url: '/transaction',
    icon: CreditCard,
  },
  {
    title: 'Budget',
    url: '/budget',
    icon: DollarSign,
  },
  {
    title: 'Goals',
    url: '/Goal',
    icon: Goal,
  },
  {
    title: 'Report',
    url: '/report',
    icon: ClipboardMinus,
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: SquareUserRound,
  }
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b p-4 h-20 flex justify-center">
        {isCollapsed ? (
          // <LayoutDashboard className="size-4" />
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
        ) : (
          <div className="flex gap-2 items-center">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-semibold">{kebabCaseToWords(pathname)}</span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Classes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                      <Link
                        href={item.url}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 h-10',
                          isActive && 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                        )}
                      >
                        <item.icon className="h-6 w-6 lg:h-10 lg:w-10" />
                        <span className="text-base lg:text-lg">{!isCollapsed && item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
