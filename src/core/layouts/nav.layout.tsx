'use client';
import Box from '@/components/ui/box';
import Container from '@/components/ui/container';
import { useAppNameSpase } from '@/hooks/useNameSpace';

import AppFooter from '../components/app-footer';
import AppHeader from '../components/app-header';

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const namespase = useAppNameSpase();
  const t = namespase.t;
  return (
    <Container className="flex flex-col min-h-screen w-full">
      <AppHeader t={t} />
      <Box className="flex-1">{children}</Box>
      <AppFooter t={t} />
    </Container>
  );
}
