'use client';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import SettingsSection from '@/core/section/private/setting/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { useEffect } from 'react';

const SettingsContainer = () => {
  const namespase = useAppNameSpase();
  const logout = useServices().Auth.mutation.useLogout();
  const userData = useServices().Auth.query();

  useEffect(() => {
    console.log(userData.profileQuery);
  }, [userData.profileQuery]);
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
        <SettingsSection logout={() => handleLogout()} isPending={logout.isPending} />
      </Container>
    </SidebarLayout>
  );
};

export default SettingsContainer;
