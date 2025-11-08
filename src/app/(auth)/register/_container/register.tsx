'use client';

import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import Box from '@/components/ui/box';
import Container from '@/components/ui/container';
import RegisterCard from '@/core/section/auth/register/hero-section';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormRegister } from '@/types/form/auth.form';

const RegisterContainer = () => {
  const namespase = useAppNameSpase();
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: '',
    password: '',
    fullName: '',
  });

  const register = namespase.serviceApp.Auth.mutation.useRegister();

  const handleRegister = () => {
    if (!formRegister.email || !formRegister.password || !formRegister.fullName) {
      namespase.alert.toast({
        title: 'Warning',
        message: 'Please fill in all fields',
        icon: 'warning',
      });
      return;
    }

    register.mutate(formRegister, {
      onSuccess: () => {
        namespase.router.push('/verify-otp');
      },
    });
  };

  return (
    <Container className="flex min-h-svh items-center justify-center p-6 md:p-10">
      <Box className="flex w-full max-w-sm flex-col gap-6">
        <Link href="#" className="flex items-center gap-2 self-center font-medium">
          <Box className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </Box>
          Velora Inc.
        </Link>
        <Box className="w-full max-w-sm">
          <RegisterCard
            formRegister={formRegister}
            setFormRegister={setFormRegister}
            onRegister={handleRegister}
            isPending={register.isPending}
            t={namespase.t}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterContainer;
