'use client';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import SettingsSection from '@/core/section/private/setting/hero-section';
import Container from '@/components/ui/container';
import { useLogout } from '@/hooks/mutation/auth/mutation';

const SettingsContainer = () => {
  const logout = useLogout({});
  const handleLogout = () => {
    logout.mutate({});
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
