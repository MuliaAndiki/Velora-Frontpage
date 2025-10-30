'use client';

import { AppSidebar } from '@/core/components/app-sidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

import LanguageDropdown from '../components/language.dropdown';
import NotificationDropdown from '../components/notification.dropdown';
import View from '@/components/ui/view';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <View className="flex min-h-screen w-full ">
        <AppSidebar />
        <SidebarInset>
          <View className="flex h-full flex-col w-full ">
            <View className="flex p-4 items-center gap-2 border-b w-full h-20">
              <View className="flex items-center justify-between  mx-auto w-full">
                <SidebarTrigger />
                <View className="flex items-center gap-4">
                  {/* <ThemeToggle /> */}
                  <LanguageDropdown />
                  <NotificationDropdown />
                  {/* <UserDropdown /> */}
                </View>
              </View>
            </View>

            <View className="flex-1 overflow-hidden w-full">
              <View className="container h-full max-w-7xl w-full mx-auto p-[1rem]">{children}</View>
            </View>
          </View>
        </SidebarInset>
      </View>
    </SidebarProvider>
  );
}
