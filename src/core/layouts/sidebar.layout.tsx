'use client';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import View from '@/components/ui/view';
import { AppSidebar } from '@/core/components/app-sidebar';

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

                  {/* <NotificationDropdown /> */}
                  {/* <UserDropdown /> */}
                </View>
              </View>
            </View>

            <View className="flex-1 overflow-hidden w-full">
              <View className="container h-full max-w-7xl w-full mx-auto ">{children}</View>
            </View>
          </View>
        </SidebarInset>
      </View>
    </SidebarProvider>
  );
}
