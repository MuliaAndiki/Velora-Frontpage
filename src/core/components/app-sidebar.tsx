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
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar
      collapsible="icon"
      className="border-r bg-slate-900 bg-opacity-95 backdrop-blur-xl shadow-xl"
    >
      <SidebarHeader className="border-b border-slate-800 p-4 h-20 flex justify-center bg-slate-900 bg-opacity-80 backdrop-blur-xl">
        {isCollapsed ? (
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
        ) : (
          <div className="flex gap-2 items-center">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-semibold text-white">{kebabCaseToWords(pathname)}</span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400">Menu</SidebarGroupLabel>
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
                          'flex items-center gap-3 rounded-xl px-3 py-2 text-slate-400 transition-all hover:text-white hover:bg-slate-800/80 h-12 font-medium',
                          isActive &&
                            'bg-gradient-to-r from-orange-600 to-purple-600 text-white shadow-lg'
                        )}
                      >
                        <item.icon className="h-6 w-6 lg:h-8 lg:w-8" />
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
