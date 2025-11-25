'use client';
import { useState } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import SettingsSection from '@/core/section/private/setting/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormUpdateProfile } from '@/types/form/auth.form';
import { PopupInterface } from '@/types/ui';
import { fileToBase64 } from '@/utils/base64';

const SettingsContainer = () => {
  const namespase = useAppNameSpase();
  const service = useServices();
  const [popUpModal, setPopUpModal] = useState<PopupInterface>(null);
  const update = service.Auth.mutation.useUpdateProfile();
  const logout = service.Auth.mutation.useLogout();
  const AuthQuery = service.Auth.query();
  const [formUpdateProfile, setFormUpdateProfile] = useState<FormUpdateProfile>({
    email: '',
    fullName: '',
    photoUrl: '',
  });
  const walletQuery = service.Wallet.query();
  const [preview, setPreview] = useState<string | null>(null);
  const handleLogout = () => {
    logout.mutate(
      {},
      {
        onSuccess: () => {
          namespase.router.push('/home');
        },
      }
    );
  };

  const handlePopUp = (data: any) => {
    setFormUpdateProfile(data);
    setPopUpModal('profile');
    setPreview(data.photoUrl);
  };
  const handleChangePict = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setFormUpdateProfile((prev) => ({
        ...prev,
        photoUrl: base64,
      }));
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  };

  const handleUpdate = () => {
    update.mutate(formUpdateProfile, {
      onSuccess: () => {
        setPopUpModal(null);
      },
    });
  };
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <SettingsSection
          logout={() => handleLogout()}
          isPending={logout.isPending}
          userData={AuthQuery.profileQuery ?? ''}
          setPopUpModal={setPopUpModal}
          popUpModal={popUpModal}
          handleOpenPopUp={handlePopUp}
          formUpdateProfile={formUpdateProfile}
          setFormUpdateProfile={setFormUpdateProfile}
          onUpdate={() => handleUpdate()}
          onChangeAva={handleChangePict}
          preview={preview}
          Iwallet={walletQuery.walletQuery ?? ''}
        />
      </Container>
    </SidebarLayout>
  );
};

export default SettingsContainer;
