'use client';
import { useAppNameSpase } from '@/hooks/useNameSpace';

import AppFooter from '../components/app-footer';
import AppHeader from '../components/app-header';

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const namespase = useAppNameSpase();
  const t = namespase.t;
  return (
    <main className="flex flex-col min-h-screen w-full">
      <AppHeader t={t} />
      <div className="flex-1">{children}</div>
      <AppFooter t={t} />
    </main>
  );
}
