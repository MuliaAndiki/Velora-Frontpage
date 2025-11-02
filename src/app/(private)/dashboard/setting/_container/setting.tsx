'use client';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import SettingsSection from '@/core/section/private/setting/hero-section';
import { useAppNameSpase } from '@/hooks/useNameSpace';

const SettingsContainer = () => {
  const namespase = useAppNameSpase();
  const logout = namespase.serviceApp.Auth.mutation.useLogout();
  const handleLogout = () => {
    logout.mutate(
      {},
      {
        onSuccess: () => {
          namespase.router.push('/login');
        },
      }
    );
  };
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <SettingsSection logout={() => handleLogout()} />
      </Container>
    </SidebarLayout>
  );
};

export default SettingsContainer;
