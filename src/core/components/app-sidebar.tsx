'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { SidebarMenuData } from '@/configs/app.config';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { kebabCaseToWords } from '@/utils/string.format';

import SidebarSection from './sidebar-section';

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const namespase = useAppNameSpase();

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
            <SidebarSection
              MenuData={SidebarMenuData}
              isCollapsed={isCollapsed}
              pathname={pathname}
              t={namespase.t}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
